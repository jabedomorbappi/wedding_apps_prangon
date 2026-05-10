from django.db import models

# --- 1. SETTINGS & CORE ---
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    
    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Package(models.Model):
    PACKAGE_TYPES = [
        ('basic', 'Basic'),
        ('standard', 'Standard'),
        ('premium', 'Premium'),
    ]
    name = models.CharField(max_length=100)
    slug = models.SlugField(
        unique=True, 
        default="temp-slug", # Provides a value for existing rows
        help_text="Used for the URL"
    )
    package_type = models.CharField(max_length=20, choices=PACKAGE_TYPES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    features = models.JSONField(default=list, help_text="List of feature strings")
    is_popular = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['price']

    def __str__(self):
        return f"{self.name} - {self.price} BDT"
from django.utils import timezone

class Booking(models.Model):
    date = models.DateField(default=timezone.now)
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='bookings')
    customer_name = models.CharField(max_length=100)
    
    # Adding defaults here prevents the migration error
    email = models.EmailField(default="placeholder@example.com")
    phone = models.CharField(max_length=20, default="0000000000")
    
    status = models.CharField(
        max_length=20, 
        choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Cancelled', 'Cancelled')],
        default='Pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('date', 'package')

    def __str__(self):
        return f"{self.date} - {self.package.name} ({self.customer_name})"

class ContactEnquiry(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'General Enquiries'

    def __str__(self):
        return f"Message from {self.name}"

# --- 3. GALLERY & EVENTS ---
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

# --- 4. MEDIA & SOCIAL ---
class Video(models.Model):
    title = models.CharField(max_length=200)
    youtube_url = models.URLField()
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def get_embed_url(self):
        url = self.youtube_url
        if 'youtu.be/' in url:
            video_id = url.split('youtu.be/')[1].split('?')[0]
            return f"https://www.youtube.com/embed/{video_id}"
        if 'watch?v=' in url:
            video_id = url.split('watch?v=')[1].split('&')[0]
            return f"https://www.youtube.com/embed/{video_id}"
        return url

    def __str__(self):
        return self.title

class WeddingFilm(models.Model):
    title = models.CharField(max_length=200)
    video_url = models.URLField(help_text="Paste YouTube or Facebook Watch URL")
    created_at = models.DateTimeField(auto_now_add=True)

class HeroSlider(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='hero_slider/')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

# --- 5. SOCIAL PROOF ---
class Testimonial(models.Model):
    couple_name = models.CharField(max_length=200)
    wedding_date = models.DateField()
    message = models.TextField()
    photo = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    rating = models.IntegerField(default=5)
    is_active = models.BooleanField(default=True)

class Stat(models.Model):
    label = models.CharField(max_length=100)
    value = models.IntegerField()
    order = models.IntegerField(default=0)