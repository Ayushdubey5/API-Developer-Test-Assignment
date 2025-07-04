'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  Search, 
  Users, 
  Star, 
  Bell, 
  TrendingUp,
  Instagram,
  Youtube,
  Music,
  Play,
  Filter
} from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function FanDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [followedCelebrities, setFollowedCelebrities] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  // Redirect if not authenticated or not a fan
  useEffect(() => {
    if (!loading && (!user || user.role !== 'fan')) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock data for followed celebrities
    const mockFollowed = [
      {
        id: '1',
        name: 'Diljit Dosanjh',
        category: 'Music',
        photo_url: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400',
        latest_post: 'New song "Hass Hass" released!',
        post_time: '2 hours ago',
        followers: 15000000,
        new_content: true
      },
      {
        id: '2',
        name: 'Priyanka Chopra',
        category: 'Acting',
        photo_url: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400',
        latest_post: 'Shooting for new Netflix series begins',
        post_time: '1 day ago',
        followers: 89000000,
        new_content: false
      },
      {
        id: '3',
        name: 'A.R. Rahman',
        category: 'Music',
        photo_url: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400',
        latest_post: 'Working on new film score',
        post_time: '3 days ago',
        followers: 3200000,
        new_content: true
      }
    ];

    const mockActivity = [
      {
        type: 'new_content',
        celebrity: 'Diljit Dosanjh',
        action: 'released a new song',
        content: 'Hass Hass',
        time: '2 hours ago'
      },
      {
        type: 'social_post',
        celebrity: 'Priyanka Chopra',
        action: 'posted on Instagram',
        content: 'Behind the scenes from set',
        time: '1 day ago'
      },
      {
        type: 'news',
        celebrity: 'A.R. Rahman',
        action: 'featured in news',
        content: 'Wins international music award',
        time: '2 days ago'
      }
    ];

    setFollowedCelebrities(mockFollowed);
    setRecentActivity(mockActivity);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const filteredCelebrities = followedCelebrities.filter(celeb =>
    celeb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    celeb.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'fan') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-xl text-gray-600">
              Stay updated with your favorite celebrities
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Following</p>
                    <p className="text-3xl font-bold text-gray-900">{followedCelebrities.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">New Updates</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {followedCelebrities.filter(c => c.new_content).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Reach</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatNumber(followedCelebrities.reduce((sum, c) => sum + c.followers, 0))}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="following" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="recommendations">Discover</TabsTrigger>
            </TabsList>

            <TabsContent value="following" className="space-y-6">
              {/* Search and Filter */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Search followed celebrities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Followed Celebrities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCelebrities.map((celebrity) => (
                  <Card key={celebrity.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={celebrity.photo_url}
                            alt={celebrity.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          {celebrity.new_content && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{celebrity.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {celebrity.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                            <Users className="w-4 h-4" />
                            {formatNumber(celebrity.followers)}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700 mb-1">{celebrity.latest_post}</p>
                        <p className="text-xs text-gray-500">{celebrity.post_time}</p>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/celebrity/${celebrity.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            View Profile
                          </Button>
                        </Link>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          <Bell className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredCelebrities.length === 0 && (
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No celebrities found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchQuery ? 'Try adjusting your search terms' : 'Start following celebrities to see them here'}
                    </p>
                    <Link href="/discover">
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Discover Celebrities
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        {activity.type === 'new_content' && <Play className="w-5 h-5 text-white" />}
                        {activity.type === 'social_post' && <Instagram className="w-5 h-5 text-white" />}
                        {activity.type === 'news' && <Star className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">
                          <span className="font-semibold">{activity.celebrity}</span> {activity.action}
                        </p>
                        <p className="text-gray-600 text-sm">{activity.content}</p>
                        <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recommended for You</CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Discover New Celebrities</h3>
                  <p className="text-gray-600 mb-6">
                    Use our AI-powered discovery tool to find celebrities based on your interests
                  </p>
                  <Link href="/discover">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Start Discovering
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}