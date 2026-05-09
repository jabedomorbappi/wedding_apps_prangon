from rest_framework import serializers
from .models import Category, EventProgram, ProgramImage, Package, Video, Testimonial, Stat,ContactEnquiry

# 1. Image Serializer (The "Children")
class ProgramImageSerializer(serializers.ModelSerializer):
    # This uses the @property 'url' we created in the model
    # to handle both PC uploads and Facebook links automatically
    image_url = serializers.ReadOnlyField(source='url')

    class Meta:
        model = ProgramImage
        fields = ['id', 'image_url', 'caption', 'details']

# 2. Program Serializer (The "Parent" / The 30 Carts)
class EventProgramSerializer(serializers.ModelSerializer):
    # This grabs all ProgramImage objects linked to this program
    images = ProgramImageSerializer(many=True, read_only=True)
    
    # We add the category name as a string so React can display "Reception" easily
    category_name = serializers.ReadOnlyField(source='category.name')
    category_slug = serializers.ReadOnlyField(source='category.slug')

    class Meta:
        model = EventProgram
        fields = [
            'id', 'category', 'category_name', 'category_slug', 
            'title', 'slug', 'date', 'thumbnail', 'description', 'images'
        ]

# 3. Category Serializer (For the "More Like This" Page)
class CategorySerializer(serializers.ModelSerializer):
    # This allows a category page to list all its programs
    programs = EventProgramSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'programs']


# Add these at the end of your serializers.py

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    # These grab the helper methods you wrote in your model
    embed_url = serializers.ReadOnlyField(source='get_embed_url')
    thumbnail_url = serializers.ReadOnlyField(source='get_thumbnail_url')

    class Meta:
        model = Video
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = '__all__'

class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = '__all__'        