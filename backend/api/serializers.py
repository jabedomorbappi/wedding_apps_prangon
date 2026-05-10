from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    package_name = serializers.ReadOnlyField(source='package.name')

    class Meta:
        model = Booking
        fields = '__all__'

class ProgramImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramImage
        fields = ['id', 'url', 'caption', 'details']

class EventProgramSerializer(serializers.ModelSerializer):
    images = ProgramImageSerializer(many=True, read_only=True)
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = EventProgram
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    embed_url = serializers.ReadOnlyField(source='get_embed_url')

    class Meta:
        model = Video
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class HeroSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlider
        fields = '__all__'

class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = '__all__'        
class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = '__all__'        