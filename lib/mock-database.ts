export interface DealOption {
  name: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  promoCode?: string
  promoPrice?: number
  validDays?: string
  bought?: string
  expires?: string
  category: string
}

export interface Deal {
  id: string
  salesforceId: string
  category: string
  dealCategory: string
  merchantName: string
  location: string
  dealName: string
  rating: number
  numberOfReviews: number
  imageUrl: string
  options: DealOption[]
  description?: string
  redemptionLocationId?: string
  grouponLink?: string
}

// Real deal data from Groupon
export const versaillesDeal: Deal = {
  id: "versailles-massage-bar-1",
  salesforceId: "006A000001dX4NGIA0",
  category: "Couples Massage",
  dealCategory: "Couples Massage",
  merchantName: "Versailles Massage & Bar",
  location: "1329 South Michigan Avenue, Chicago",
  dealName: "Indulge in Royal Treatment Packages or Swedish/Deep Tissue Massage at Versailles Massage & Bar - Up to 55% Off",
  rating: 4.3,
  numberOfReviews: 7415,
  imageUrl: "https://img.grouponcdn.com/deal/3SLPqjagzDu8MJHat279AmJdGBeT/3S-2000x1200/v1/t1024x619.webp",
  redemptionLocationId: "a3fd3457-3cd6-b06a-9299-0152ec0c74c1",
  description: "Ease into relaxing treatments for the feet or back on your own or with a partner in a luxe spa complete with an onsite bar",
  grouponLink: "https://www.groupon.com/deals/versailles-massage-bar-1?redemptionLocationId=a3fd3457-3cd6-b06a-9299-0152ec0c74c1",
  options: [
    {
      name: "60-Minute Versailles Royal Treatment Package for Two with a Cocktail or Champagne (Valid Any Day)",
      originalPrice: 199,
      discountedPrice: 89.10,
      discountPercentage: 55,
      promoCode: "SAVEMORE",
      promoPrice: 80.19,
      bought: "5,000+",
      expires: "05 Aug, 2025",
      category: "Couples Massage"
    },
    {
      name: "60-Minute Versailles Royal Treatment Package for One with Cocktail or Champagne (Valid Monday-Friday)",
      originalPrice: 129,
      discountedPrice: 62.10,
      discountPercentage: 52,
      promoCode: "SAVEMORE",
      promoPrice: 55.89,
      bought: "10,000+",
      expires: "05 Aug, 2025",
      validDays: "Monday-Friday",
      category: "Deep Tissue Massage"
    },
    {
      name: "30-Minute Swedish or Deep Tissue Therapy Massage (Valid Monday-Friday)",
      originalPrice: 50,
      discountedPrice: 31.50,
      discountPercentage: 37,
      promoCode: "SAVEMORE",
      promoPrice: 28.35,
      bought: "10,000+",
      expires: "05 Aug, 2025",
      validDays: "Monday-Friday",
      category: "Deep Tissue Massage"
    },
    {
      name: "60-Minute Versailles Royal Treatment Package for One with a Cocktail or Champagne (Valid Saturday-Sunday)",
      originalPrice: 129,
      discountedPrice: 71.10,
      discountPercentage: 45,
      promoCode: "SAVEMORE",
      promoPrice: 63.99,
      bought: "10+",
      expires: "04 Oct, 2025",
      validDays: "Saturday-Sunday",
      category: "Deep Tissue Massage"
    }
  ]
}

export const fitFootDeal: Deal = {
  id: "fit-foot-6-12",
  salesforceId: "006A000001dX4NKIA0",
  category: "Deep Tissue Massage",
  dealCategory: "Deep Tissue Massage",
  merchantName: "Fit Foot",
  location: "1459 West Fullerton Avenue, Chicago",
  dealName: "Indulge in a Couple Deep Tissue Massage Experience with Fit Foot, Choose from 60 or 90 Minutes for Up to 50% Off",
  rating: 4.5,
  numberOfReviews: 9120,
  imageUrl: "https://img.grouponcdn.com/deal/3ASwpwtsqrSPe3DWe9LGD3M3ySPF/3A-2048x1229/v1/t1024x619.webp",
  redemptionLocationId: "f0abb631-19cf-b06a-9052-013a913cab22",
  description: "Professional massage therapists help couples relax and unwind with deep-tissue massage techniques",
  grouponLink: "https://www.groupon.com/deals/fit-foot-6-12?redemptionLocationId=f0abb631-19cf-b06a-9052-013a913cab22",
  options: [
    {
      name: "60-Minute Deep-Tissue Combo Massage for Two",
      originalPrice: 144,
      discountedPrice: 72,
      discountPercentage: 50,
      bought: "450+",
      expires: "120 days after purchase",
      category: "Deep Tissue Massage"
    },
    {
      name: "90-Minute Deep-Tissue Combo Massage for Two",
      originalPrice: 180,
      discountedPrice: 110,
      discountPercentage: 39,
      bought: "90+",
      expires: "120 days after purchase",
      category: "Deep Tissue Massage"
    }
  ]
}

export const wellnessFootDeal: Deal = {
  id: "wellness-foot-spa-9",
  salesforceId: "006A000001dX4NLIA0",
  category: "Couples Massage",
  dealCategory: "Couples Massage",
  merchantName: "Wellness Foot Spa",
  location: "1713 North Clybourn Avenue, Chicago",
  dealName: "Relax and Rejuvenate: Full-Body Relief with Massage Packages for One or Two at Wellness Foot Spa - Up to 55% Off",
  rating: 4.6,
  numberOfReviews: 498,
  imageUrl: "https://img.grouponcdn.com/deal/FWq1ds1z5LvtYS8jhkKNMjLzRFS/FW-700x421/v1/t1024x619.webp",
  redemptionLocationId: "02622897-6a40-bed3-9b7d-017e930404b0",
  description: "Professional massage therapists provide relaxing massage treatments that help ease muscle tension and promote relaxation",
  grouponLink: "https://www.groupon.com/deals/wellness-foot-spa-9?redemptionLocationId=02622897-6a40-bed3-9b7d-017e930404b0",
  options: [
    {
      name: "One 90-Minute Combo Massage Package for One",
      originalPrice: 180,
      discountedPrice: 88.20,
      discountPercentage: 51,
      promoCode: "GROUPON",
      promoPrice: 66.15,
      bought: "1,000+",
      expires: "120 days after purchase",
      category: "Couples Massage"
    },
    {
      name: "One 90-Minute Couples Combo Massage Package for Two",
      originalPrice: 360,
      discountedPrice: 162,
      discountPercentage: 55,
      promoCode: "GROUPON",
      promoPrice: 121.50,
      bought: "1,000+",
      expires: "120 days after purchase",
      category: "Couples Massage"
    },
    {
      name: "One 70-Minute Combo Massage Package for One",
      originalPrice: 156,
      discountedPrice: 74.88,
      discountPercentage: 52,
      promoCode: "GROUPON",
      promoPrice: 56.16,
      bought: "440+",
      expires: "120 days after purchase",
      category: "Couples Massage"
    }
  ]
}

// API endpoints will use this data
export const deals: Deal[] = [versaillesDeal, fitFootDeal, wellnessFootDeal]; 