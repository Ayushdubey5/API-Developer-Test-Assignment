'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Star, Users, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock celebrity data - in production, this would come from your API
  useEffect(() => {
    const mockCelebrities = [
      {
        id: '1',
        name: 'Diljit Dosanjh',
        category: 'Music',
        country: 'India',
        photo_url: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400',
        fanbase: 1250000,
        bio: 'Punjabi singer and actor who has performed at major international venues including Coachella.',
        instagram_followers: 15000000,
        youtube_followers: 8500000
      },
      {
        id: '2',
        name: 'Priyanka Chopra',
        category: 'Acting',
        country: 'India',
        photo_url: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400',
        fanbase: 2800000,
        bio: 'International actress and producer known for Bollywood and Hollywood films.',
        instagram_followers: 89000000,
        youtube_followers: 2100000
      },
      {
        id: '3',
        name: 'A.R. Rahman',
        category: 'Music',
        country: 'India',
        photo_url: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400',
        fanbase: 980000,
        bio: 'Oscar-winning composer and music director known for film scores and world music.',
        instagram_followers: 3200000,
        youtube_followers: 5700000
      },
      {
        id: '4',
        name: 'Deepika Padukone',
        category: 'Acting',
        country: 'India',
        photo_url: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
        fanbase: 3200000,
        bio: 'Leading Bollywood actress and mental health advocate.',
        instagram_followers: 75000000,
        youtube_followers: 890000
      },
      {
        id: '5',
        name: 'Badshah',
        category: 'Music',
        country: 'India',
        photo_url: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=400',
        fanbase: 1800000,
        bio: 'Popular rapper and music producer in Bollywood and independent music scene.',
        instagram_followers: 12000000,
        youtube_followers: 15000000
      },
      {
        id: '6',
        name: 'Alia Bhatt',
        category: 'Acting',
        country: 'India',
        photo_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        fanbase: 2100000,
        bio: 'Acclaimed Bollywood actress known for versatile performances.',
        instagram_followers: 82000000,
        youtube_followers: 1200000
      }
    ];

    setTimeout(() => {
      setCelebrities(mockCelebrities);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCelebrities = celebrities.filter(celeb =>
    celeb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    celeb.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Celebrity Discovery</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            CelebNetwork
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover, connect, and engage with your favorite celebrities through our AI-powered platform. 
            Get exclusive content, follow updates, and join the largest celebrity fan community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/discover">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
                <Search className="w-5 h-5 mr-2" />
                Discover Celebrities
              </Button>
            </Link>
            
            <Link href="/auth/signup">
              <Button variant="outline" size="lg" className="border-2 border-purple-200 hover:border-purple-300 px-8 py-4 text-lg">
                Join as Fan
              </Button>
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search celebrities, genres, or countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-white/50 bg-white/70 backdrop-blur-sm rounded-2xl focus:border-purple-300 focus:ring-purple-200"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">10M+</h3>
                <p className="text-gray-600">Active Fans</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">50K+</h3>
                <p className="text-gray-600">Verified Celebrities</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">1B+</h3>
                <p className="text-gray-600">Interactions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Celebrities */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Celebrities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover trending celebrities and connect with your favorites
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCelebrities.map((celebrity) => (
                <Link key={celebrity.id} href={`/celebrity/${celebrity.id}`}>
                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <img
                          src={celebrity.photo_url}
                          alt={celebrity.name}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                            {celebrity.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {celebrity.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {celebrity.bio}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {formatNumber(celebrity.fanbase)}
                          </span>
                          <span>{celebrity.country}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          IG: {formatNumber(celebrity.instagram_followers)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          YT: {formatNumber(celebrity.youtube_followers)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Connect?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of fans discovering and connecting with their favorite celebrities every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                  Start Following
                </Button>
              </Link>
              <Link href="/discover">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg">
                  Browse Celebrities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}