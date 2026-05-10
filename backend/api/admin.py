from django.contrib import admin
from .models import (
    Category, EventProgram, ProgramImage, 
    Package, Booking, Video, Testimonial, 
    Stat, WeddingFilm, HeroSlider
)

# --- 1. Inlines ---
class ProgramImageInline(admin.TabularInline):
    model = ProgramImage
    extra = 3 # Reduced from 10 for a cleaner UI, but you can increase as needed
    fields = ('image_file', 'image_url', 'caption', 'details')

# --- 2. Program & Category ---
@admin.register(EventProgram)
class EventProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('category', 'date')
    search_fields = ('title', 'description')
    inlines = [ProgramImageInline]

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

# --- 3. Booking System (The New Logic) ---
@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    # Added slug here since we're using dynamic URLs now
    list_display = ['name', 'package_type', 'price', 'is_popular', 'slug']
    list_editable = ['is_popular']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('date', 'package', 'customer_name', 'phone', 'email')
    list_filter = ('date', 'package')
    search_fields = ('customer_name', 'phone', 'email')
    date_hierarchy = 'date'

# --- 4. Content Management ---
@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_featured', 'uploaded_at']
    list_editable = ['is_featured']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['couple_name', 'wedding_date', 'rating', 'is_active']
    list_editable = ['is_active']

@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'order']
    list_editable = ['value', 'order']

# --- 5. Simple Registrations ---
admin.site.register(HeroSlider)
admin.site.register(WeddingFilm)

# NOTE: I removed ContactEnquiry because 'Booking' now handles 
# the reservation logic. Keep only one to stay organized.