from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    Package, Video, Testimonial, Stat, 
    ContactEnquiry, Category, EventProgram
)
from .serializers import (
    PackageSerializer, VideoSerializer, TestimonialSerializer, 
    StatSerializer, ContactEnquirySerializer, 
    CategorySerializer, EventProgramSerializer
)

# --- NEW CORE VIEWS (The 30 Programs & Categories) ---

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ View for Category pages (e.g., list all Reception programs) """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class EventProgramViewSet(viewsets.ReadOnlyModelViewSet):
    """ The main view for your 30 'Carts' on the Home Page """
    queryset = EventProgram.objects.all().order_by('-date')
    serializer_class = EventProgramSerializer

# --- BUSINESS VIEWS ---

class PackageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class VideoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer

class StatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer

# --- FUNCTION BASED VIEWS (Enquiry & Homepage) ---

@api_view(['POST'])
def submit_enquiry(request):
    serializer = ContactEnquirySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'message': 'Enquiry submitted successfully!'},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def featured_content(request):
    """ Fetches everything needed for the homepage in one request """
    # Get the 6 most recent programs for the home 'carts'
    featured_programs = EventProgram.objects.all().order_by('-date')[:6]
    featured_videos = Video.objects.filter(is_featured=True)[:3]
    stats = Stat.objects.all()
    packages = Package.objects.all()

    return Response({
        'featured_programs': EventProgramSerializer(featured_programs, many=True, context={'request': request}).data,
        'featured_videos': VideoSerializer(featured_videos, many=True, context={'request': request}).data,
        'stats': StatSerializer(stats, many=True).data,
        'packages': PackageSerializer(packages, many=True).data,
    })