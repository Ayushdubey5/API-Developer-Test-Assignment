'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Search, Sparkles, Loader2, Users, Star, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_CELEBRITY_API);


export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCelebrity, setSelectedCelebrity] = useState(null);
  const [onboardingData, setOnboardingData] = useState({
    name: '',
    category: '',
    country: '',
    bio: '',
    instagram_url: '',
    youtube_url: '',
    spotify_url: ''
  });
  const downloadCelebrityPDF = (celebrity) => {
    const content = `
Name: ${celebrity.name}
Category: ${celebrity.category}
Country: ${celebrity.country}

Bio:
${celebrity.bio}

Estimated Instagram Followers: ${celebrity.estimated_instagram_followers}
Estimated YouTube Followers: ${celebrity.estimated_youtube_followers}
`;

    const blob = new Blob([content], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${celebrity.name.replace(/\s+/g, '_')}_Info.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleAISearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setLoading(true);
    setSuggestions([]);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `Given the search query: "${searchQuery}", suggest 5 real celebrities who match this description. For each celebrity, provide:
      - Name
      - Primary category (Music, Acting, Sports, etc.)
      - Country of origin
      - Brief bio (2-3 sentences)
      - Estimated social media following ranges
      
      Format as JSON array with objects containing: name, category, country, bio, estimated_instagram_followers, estimated_youtube_followers
      
      Only return the JSON array, no additional text.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      try {
        // Extract JSON from the response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const celebrities = JSON.parse(jsonMatch[0]);
          setSuggestions(celebrities);
        } else {
          throw new Error('No valid JSON found in response');
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        toast.error('Failed to parse AI response. Please try again.');
      }
    } catch (error) {
      console.error('AI search error:', error);
      toast.error('AI search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCelebrity = async (celebrity) => {
    setSelectedCelebrity(celebrity);

    // Auto-fill onboarding form
    setOnboardingData({
      name: celebrity.name,
      category: celebrity.category,
      country: celebrity.country,
      bio: celebrity.bio,
      instagram_url: `https://instagram.com/${celebrity.name.toLowerCase().replace(/\s+/g, '')}`,
      youtube_url: `https://youtube.com/c/${celebrity.name.replace(/\s+/g, '')}`,
      spotify_url: `https://spotify.com/artist/${celebrity.name.replace(/\s+/g, '')}`
    });

    // Scroll to onboarding form
    document.getElementById('onboarding-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitOnboarding = async (e) => {
    e.preventDefault();

    try {
      // Mock API call - replace with actual backend
      console.log('Submitting celebrity data:', onboardingData);
      toast.success('Celebrity profile created successfully!');

      // Reset form
      setSelectedCelebrity(null);
      setOnboardingData({
        name: '',
        category: '',
        country: '',
        bio: '',
        instagram_url: '',
        youtube_url: '',
        spotify_url: ''
      });
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error('Failed to create celebrity profile');
    }
  };

  const formatNumber = (num) => {
    if (typeof num === 'string') {
      return num;
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toString() || 'N/A';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Discovery</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Discover Celebrities
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use AI to find celebrities based on your interests, preferences, or specific criteria.
              Our intelligent search helps you discover both popular and emerging talent.
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-12">
            <div className="max-w-2xl mx-auto">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Describe the celebrity you are looking for:
              </label>

              <div className="space-y-4">
                <Textarea
                  placeholder="e.g., 'Punjabi singer who performed at Coachella' or 'Young Bollywood actress known for method acting' or 'K-pop group with global success'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="min-h-[120px] text-lg border-2 border-purple-100 focus:border-purple-300 focus:ring-purple-200 rounded-xl"
                />

                <Button
                  onClick={handleAISearch}
                  disabled={loading || !searchQuery.trim()}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Searching with AI...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Search with AI
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">Try these example searches:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    'Oscar-winning Indian composer',
                    'Popular K-pop girl group',
                    'British actor in Marvel movies',
                    'Spanish footballer playing for Barcelona'
                  ].map((example) => (
                    <button
                      key={example}
                      onClick={() => setSearchQuery(example)}
                      className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {suggestions.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                AI Suggestions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((celebrity, index) => (
                  <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-xl text-gray-900">{celebrity.name}</CardTitle>
                      <div className="flex justify-center gap-2">
                        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                          {celebrity.category}
                        </Badge>
                        <Badge variant="outline">{celebrity.country}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {celebrity.bio}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-gray-500">
                            <Instagram className="w-4 h-4" />
                            Instagram
                          </span>
                          <span className="font-medium">
                            {formatNumber(celebrity.estimated_instagram_followers)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-gray-500">
                            <Youtube className="w-4 h-4" />
                            YouTube
                          </span>
                          <span className="font-medium">
                            {formatNumber(celebrity.estimated_youtube_followers)}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleSelectCelebrity(celebrity)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        Select & Onboard
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => downloadCelebrityPDF(celebrity)}
                      >
                        Download Info PDF
                      </Button>

                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}


          {/* Onboarding Form */}
          {selectedCelebrity && (
            <div id="onboarding-form" className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Celebrity Onboarding
                </h2>
                <p className="text-gray-600">
                  Complete the profile for {selectedCelebrity.name}
                </p>
              </div>

              <form onSubmit={handleSubmitOnboarding} className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <Input
                      value={onboardingData.name}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <Input
                      value={onboardingData.category}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, category: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <Input
                      value={onboardingData.country}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, country: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram URL
                    </label>
                    <Input
                      value={onboardingData.instagram_url}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, instagram_url: e.target.value }))}
                      placeholder="https://instagram.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube URL
                    </label>
                    <Input
                      value={onboardingData.youtube_url}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, youtube_url: e.target.value }))}
                      placeholder="https://youtube.com/c/channel"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Spotify URL
                    </label>
                    <Input
                      value={onboardingData.spotify_url}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, spotify_url: e.target.value }))}
                      placeholder="https://spotify.com/artist/id"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biography
                  </label>
                  <Textarea
                    value={onboardingData.bio}
                    onChange={(e) => setOnboardingData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Brief biography..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedCelebrity(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Create Profile
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}