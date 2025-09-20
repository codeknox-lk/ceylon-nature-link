#!/bin/bash

# Script to help organize hero slider images
# Run this script after downloading images from free stock photo sites

echo "🎨 Ceylon Nature Link - Hero Slider Image Setup"
echo "=============================================="
echo ""

# Create backup of existing images
echo "📁 Creating backup of existing images..."
mkdir -p backup-images
cp public/photo-*.png backup-images/ 2>/dev/null || echo "No existing images to backup"

echo ""
echo "📋 Please download these 4 images and save them as:"
echo ""
echo "1. photo-01.png - Premium Ceylon Spices"
echo "   Search: 'ceylon spices cinnamon' on Unsplash/Pexels"
echo ""
echo "2. photo-02.png - Dehydrated Fruits" 
echo "   Search: 'dehydrated fruits tropical' on Unsplash/Pexels"
echo ""
echo "3. photo-03.png - Natural Heritage"
echo "   Search: 'sri lanka countryside farming' on Unsplash/Pexels"
echo ""
echo "4. photo-04.png - Export Quality"
echo "   Search: 'shipping containers global trade' on Unsplash/Pexels"
echo ""

# Check if images exist
echo "🔍 Checking for images..."
for i in {1..4}; do
    if [ -f "public/photo-0$i.png" ]; then
        echo "✅ photo-0$i.png - Found"
    else
        echo "❌ photo-0$i.png - Missing"
    fi
done

echo ""
echo "📝 After downloading images:"
echo "1. Save them in the 'public' folder"
echo "2. Name them exactly: photo-01.png, photo-02.png, photo-03.png, photo-04.png"
echo "3. Run 'npm run dev' to test"
echo ""
echo "🌐 Free Image Sources:"
echo "- Unsplash: https://unsplash.com"
echo "- Pexels: https://www.pexels.com"
echo "- Pixabay: https://pixabay.com"
