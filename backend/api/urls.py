from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import HeroSliderListView

router = DefaultRouter()

# Register each ViewSet EXACTLY once
router.register(r'categories', views.CategoryViewSet, basename='category')
router.register(r'event-programs', views.EventProgramViewSet, basename='eventprogram')
router.register(r'packages', views.PackageViewSet, basename='package')
router.register(r'videos', views.VideoViewSet, basename='video')
router.register(r'testimonials', views.TestimonialViewSet, basename='testimonial')
router.register(r'stats', views.StatViewSet, basename='stat')
router.register(r'wedding-films', views.WeddingFilmViewSet, basename='wedding-films')
urlpatterns = [
    path('', include(router.urls)),
    path('submit-enquiry/', views.submit_enquiry, name='submit-enquiry'),
    path('featured-content/', views.featured_content, name='featured-content'),
    path('hero-slider/', HeroSliderListView.as_view(), name='hero-slider-list'),
    path('check-availability/', views.check_availability, name='check-availability'),


    path('packages/', views.get_packages, name='get_packages'),
  
    path('enquiry/', views.create_inquiry, name='create_inquiry'),
    
]