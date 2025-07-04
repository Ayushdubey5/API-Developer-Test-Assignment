'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Heart,
  HeartOff,
  Users,
  Instagram,
  Youtube,
  Music,
  Download,
  MapPin,
  Calendar,
  Star,
  Play,
  ExternalLink,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';

export default function CelebrityProfilePage() {
  const params = useParams();
  const { user } = useAuth();
  const [celebrity, setCelebrity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const mockCelebrities = {
      '1': {
        id: '1',
        name: 'Diljit Dosanjh',
        category: 'Music',
        country: 'India',
        photo_url:
          'https://static.toiimg.com/photo/98667052.cms', // Real image
        fanbase: 1250000,
        bio: 'Diljit Dosanjh is a Punjabi singer, actor, and television presenter who works in Punjabi and Hindi cinema...',
        instagram_followers: 15000000,
        youtube_followers: 8500000,
        instagram_url: 'https://instagram.com/diljitdosanjh',
        youtube_url: 'https://youtube.com/c/DiljitDosanjh',
        spotify_url: 'https://spotify.com/artist/diljitdosanjh',
        joined_date: '2023-01-15',
        recent_songs: [
          { title: 'Hass Hass', views: '85M', url: '#' },
          { title: 'Born to Shine', views: '42M', url: '#' },
          { title: 'Lover', views: '156M', url: '#' },
        ],
        recent_news: [
          { title: 'Diljit Dosanjh makes history at Coachella 2023', date: '2023-04-16', url: '#' },
          { title: 'New album "Ghost" breaks streaming records', date: '2023-03-10', url: '#' },
          { title: 'Upcoming world tour announced', date: '2023-02-28', url: '#' },
        ],
      },
      '2': {
        id: '2',
        name: 'Priyanka Chopra',
        category: 'Acting',
        country: 'India',
        photo_url:
          'https://upload.wikimedia.org/wikipedia/commons/5/56/Priyanka_Chopra_2023.jpg', // Real image
        fanbase: 2800000,
        bio: "Priyanka Chopra Jonas is an Indian actress, producer, and singer who has worked in both Bollywood and Hollywood films...",
        instagram_followers: 89000000,
        youtube_followers: 2100000,
        instagram_url: 'https://instagram.com/priyankachopra',
        youtube_url: 'https://youtube.com/c/PriyankaChopra',
        spotify_url: null,
        joined_date: '2022-11-20',
        recent_movies: [
          { title: 'The Matrix Resurrections', year: '2021', url: '#' },
          { title: 'Citadel', year: '2023', url: '#' },
          { title: 'Love Again', year: '2023', url: '#' },
        ],
        recent_news: [
          { title: "Priyanka Chopra joins Amazon's Citadel series", date: '2023-04-28', url: '#' },
          { title: 'New production company announces first project', date: '2023-03-15', url: '#' },
          { title: 'UNICEF Goodwill Ambassador visits India', date: '2023-02-10', url: '#' },
        ],
      },
    };

    const celebrityData = mockCelebrities[params.id];
    if (celebrityData) {
      setCelebrity(celebrityData);
      setIsFollowing(Math.random() > 0.5);
    }
    setLoading(false);
  }, [params.id]);

  const handleFollow = async () => {
    if (!user) {
      toast.error('Please login to follow celebrities');
      return;
    }
    setFollowLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsFollowing(!isFollowing);
      toast.success(isFollowing ? 'Unfollowed successfully' : 'Following successfully');
    } catch (error) {
      toast.error('Failed to update follow status');
    } finally {
      setFollowLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      toast.success('PDF download started...');
      console.log('Downloading PDF for celebrity:', celebrity.id);
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (loading) return <div className="p-10">Loading...</div>;

  if (!celebrity) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="text-center pt-20">
          <h1 className="text-2xl font-bold">Celebrity Not Found</h1>
          <Link href="/">
            <Button className="mt-4">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      {/* the rest of the JSX remains unchanged as in your original post */}
    </div>
  );
}
