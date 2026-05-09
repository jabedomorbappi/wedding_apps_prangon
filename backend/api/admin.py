from django.contrib import admin
from .models import (
    Category, EventProgram, ProgramImage, 
    Package, Video, Testimonial, Stat, ContactEnquiry
)

# 1. Inline for the 10 images inside a Program
class ProgramImageInline(admin.TabularInline):
    model = ProgramImage
    extra = 10 
    fields = ('image_file', 'image_url', 'caption', 'details')

# 2. Program Admin (The 30 Carts)
@admin.register(EventProgram)
class EventProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('category', 'date')
    search_fields = ('title', 'description')
    inlines = [ProgramImageInline]

# 3. Category Admin
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

# 4. Package Admin
@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ['name', 'package_type', 'price', 'is_popular']
    list_editable = ['is_popular']

# 5. Video Admin
@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_featured', 'uploaded_at']
    list_editable = ['is_featured']

# 6. Testimonial Admin
@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['couple_name', 'wedding_date', 'rating', 'is_active']
    list_editable = ['is_active']

# 7. Stat Admin
@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'order']
    list_editable = ['value', 'order']

# 8. Contact Enquiry Admin
@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'wedding_date', 'package', 'created_at', 'is_read']
    list_editable = ['is_read']
    list_filter = ['is_read']
    readonly_fields = ['created_at']

# # Register your other business models
# admin.site.register(Package)
# admin.site.register(Video)
# admin.site.register(Testimonial)
# admin.site.register(Stat)
# admin.site.register(ContactEnquiry)