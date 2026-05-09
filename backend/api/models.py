# backend/api/models.py

from django.db import models

class Package(models.Model):
    PACKAGE_TYPES = [
        ('basic', 'Basic'),
        ('standard', 'Standard'),
        ('premium', 'Premium'),
    ]
    
    name = models.CharField(max_length=100)
    package_type = models.CharField(max_length=20, choices=PACKAGE_TYPES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    features = models.JSONField(default=list)   # list of feature strings
    is_popular = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - ${self.price}"

    class Meta:
        ordering = ['price']


class GalleryImage(models.Model):
    CATEGORIES = [
        ('ceremony', 'Ceremony'),
        ('reception', 'Reception'),
        ('portrait', 'Portrait'),
        ('details', 'Details'),
    ]

    title = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=20, choices=CATEGORIES)
    is_featured = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category} - {self.title or self.id}"

    class Meta:
        ordering = ['-uploaded_at']


class Video(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    youtube_url = models.URLField()                                          # required now
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def get_embed_url(self):
        """Convert any YouTube URL format to embeddable format."""
        url = self.youtube_url

        # Handle youtu.be/VIDEO_ID short links
        if 'youtu.be/' in url:
            video_id = url.split('youtu.be/')[1].split('?')[0]
            return f"https://www.youtube.com/embed/{video_id}"

        # Handle youtube.com/watch?v=VIDEO_ID links
        if 'watch?v=' in url:
            video_id = url.split('watch?v=')[1].split('&')[0]
            return f"https://www.youtube.com/embed/{video_id}"

        # Already an embed URL — return as is
        if 'youtube.com/embed/' in url:
            return url

        return url

    def get_thumbnail_url(self):
        """Auto-fetch YouTube thumbnail if no custom one uploaded."""
        if self.thumbnail:
            return self.thumbnail.url

        # Extract video ID and use YouTube's free thumbnail CDN
        url = self.youtube_url
        video_id = None

        if 'youtu.be/' in url:
            video_id = url.split('youtu.be/')[1].split('?')[0]
        elif 'watch?v=' in url:
            video_id = url.split('watch?v=')[1].split('&')[0]
        elif 'youtube.com/embed/' in url:
            video_id = url.split('youtube.com/embed/')[1].split('?')[0]

        if video_id:
            return f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"

        return None

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-uploaded_at']


class Testimonial(models.Model):
    couple_name = models.CharField(max_length=200)
    wedding_date = models.DateField()
    message = models.TextField()
    photo = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    rating = models.IntegerField(default=5)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.couple_name

    class Meta:
        ordering = ['-wedding_date']


class Stat(models.Model):
    label = models.CharField(max_length=100)   # e.g. "Weddings Captured"
    value = models.IntegerField()              # e.g. 350
    icon = models.CharField(max_length=50, blank=True)  # e.g. "camera"
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.value} {self.label}"

    class Meta:
        ordering = ['order']


class ContactEnquiry(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    wedding_date = models.DateField(null=True, blank=True)
    package = models.ForeignKey(Package, null=True, blank=True, on_delete=models.SET_NULL)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.email}"

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Contact Enquiries'













from django.db import models

# --- CORE STRUCTURE (Programs & Photos) ---

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    
    def __str__(self):
        return self.name

class EventProgram(models.Model):
    category = models.ForeignKey(Category, related_name='programs', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    date = models.DateField()
    thumbnail = models.ImageField(upload_to='events/thumbs/') 
    description = models.TextField()

    def __str__(self):
        return self.title

class ProgramImage(models.Model):
    program = models.ForeignKey(EventProgram, related_name='images', on_delete=models.CASCADE)
    image_file = models.ImageField(upload_to='events/gallery/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    caption = models.CharField(max_length=200, blank=True)
    details = models.TextField(blank=True)

    @property
    def url(self):
        return self.image_file.url if self.image_file else self.image_url