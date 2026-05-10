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

# Change this line
class WeddingFilmViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


from rest_framework import generics
from .models import HeroSlider
from .serializers import HeroSliderSerializer

class HeroSliderListView(generics.ListAPIView):
    queryset = HeroSlider.objects.filter(is_active=True)
    serializer_class = HeroSliderSerializer    

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Package, Booking
from .serializers import PackageSerializer, BookingSerializer

@api_view(['GET'])
def get_packages(request):
    """
    Returns all packages. 
    You can use this to populate your Packages.jsx page.
    """
    packages = Package.objects.all()
    serializer = PackageSerializer(packages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def check_availability(request):
    """
    Checks availability for packages and types on a specific date.
    Input: { "date": "2026-05-20" }
    """
    selected_date = request.data.get('date')
    if not selected_date:
        return Response({"error": "Date required"}, status=status.HTTP_400_BAD_REQUEST)

    # 1. Find all booked package IDs for this date
    booked_ids = Booking.objects.filter(date=selected_date).values_list('package_id', flat=True)
    
    # 2. Find all unique Package Types that are fully booked for this date
    # (Since you are usually the lead photographer, one booking in a type makes that type unavailable)
    booked_types = Package.objects.filter(id__in=booked_ids).values_list('package_type', flat=True).distinct()

    # 3. Get all packages to build the full status list
    all_packages = Package.objects.all()
    
    availability_data = []
    for pkg in all_packages:
        availability_data.append({
            "id": pkg.id,
            "name": pkg.name,
            "package_type": pkg.package_type,
            "is_available": pkg.id not in booked_ids
        })

    return Response({
        "date": selected_date,
        "booked_types": list(booked_types),  # e.g. ["Basic", "Wedding Combo"]
        "package_details": availability_data # Full list for individual card checks
    })

@api_view(['POST'])
def create_inquiry(request):
    """
    Handles the submission from Contact.jsx.
    Checks availability one last time before saving to prevent double-booking.
    """
    serializer = BookingSerializer(data=request.data)
    if serializer.is_valid():
        date = serializer.validated_data['date']
        package = serializer.validated_data['package']

        # Final check to prevent race conditions
        if Booking.objects.filter(date=date, package=package).exists():
            return Response(
                {"error": "This package was just booked by someone else for this date!"}, 
                status=status.HTTP_409_CONFLICT
            )
        
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)