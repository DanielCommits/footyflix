"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Users,
  Share2,
  Heart,
  MessageCircle,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

interface WatchPageProps {
  match: any;
  onBack: () => void;
}

export default function WatchPage({ match, onBack }: WatchPageProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      user: "FootballFan23",
      message: "What a goal by Haaland! 🔥",
      time: "2m ago",
    },
    {
      user: "LiverpoolRed",
      message: "Come on Liverpool! YNWA",
      time: "3m ago",
    },
    { user: "CityBlue", message: "De Bruyne is pure magic", time: "5m ago" },
    {
      user: "PremierLeagueFan",
      message: "Best match of the season!",
      time: "7m ago",
    },
  ]);

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        { user: "You", message: chatMessage, time: "now" },
        ...chatMessages,
      ]);
      setChatMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - Responsive */}
      <div className="flex items-center justify-between p-3 md:p-4 bg-black/90 border-b border-gray-800">
        <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-sm md:text-lg lg:text-xl font-bold truncate">
              {match.homeTeam} vs {match.awayTeam}
            </h1>
            <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-400">
              <span className="truncate">{match.league}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline truncate">{match.stadium}</span>
              {match.isLive && (
                <>
                  <span>•</span>
                  <Badge className="bg-red-600 hover:bg-red-700 text-xs px-1 py-0">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse" />
                    LIVE
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Header Actions - Responsive */}
        <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
          {/* Mobile Chat/Stats Toggle */}
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileChat(!showMobileChat)}
              className="relative"
            >
              {showMobileChat ? (
                <BarChart3 className="h-4 w-4" />
              ) : (
                <MessageCircle className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Social Share - Hidden on small screens */}
          <div className="hidden sm:flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const matchText = `Watching ${match.homeTeam} vs ${
                  match.awayTeam
                } LIVE! ${match.homeScore}-${
                  match.awayScore
                } 🔥⚽ #${match.league.replace(/\s+/g, "")}`;
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    matchText
                  )}&url=${encodeURIComponent(window.location.href)}`,
                  "_blank"
                );
              }}
              title="Share on Twitter"
              className="hidden md:flex"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Layout - Responsive */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Video Player Section */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="relative bg-gray-900 aspect-video w-full">
            {/* Video placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20 flex items-center justify-center">
              <div className="text-center px-4">
                <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-2 md:mb-4">
                  {match.homeScore} - {match.awayScore}
                </div>
                <div className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-1 md:mb-2">
                  {match.time} • {match.viewers} watching
                </div>
                <div className="text-xs sm:text-sm md:text-lg text-gray-400">
                  Live Football Stream
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20 h-8 w-8 md:h-10 md:w-10"
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
                    )}
                  </Button>
                  <div className="text-xs md:text-sm text-white">
                    <span className="hidden sm:inline">{match.time} • </span>
                    <span className="hidden md:inline">{match.league}</span>
                    <span className="sm:hidden">{match.time}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 h-8 w-8 md:h-10 md:w-10"
                  >
                    <Settings className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 h-8 w-8 md:h-10 md:w-10"
                  >
                    <Maximize className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Match Info Below Video - Mobile/Tablet */}
          <div className="p-3 md:p-4 bg-gray-900 lg:hidden">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm">
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Users className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                  <span className="text-gray-400">{match.viewers} viewers</span>
                </div>
                <div className="text-gray-400 hidden sm:block">•</div>
                <div className="text-gray-400 hidden sm:block truncate">
                  {match.stadium}
                </div>
              </div>
            </div>

            {/* Quick Stats - Mobile */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 text-center mb-3 md:mb-4">
              <div>
                <div className="text-lg md:text-2xl font-bold text-blue-400">
                  {match.possession?.home || 58}%
                </div>
                <div className="text-xs text-gray-400">Possession</div>
              </div>
              <div>
                <div className="text-lg md:text-2xl font-bold">
                  {match.homeScore} - {match.awayScore}
                </div>
                <div className="text-xs text-gray-400">Score</div>
              </div>
              <div>
                <div className="text-lg md:text-2xl font-bold text-red-400">
                  {match.possession?.away || 42}%
                </div>
                <div className="text-xs text-gray-400">Possession</div>
              </div>
            </div>

            {/* Mobile Social Actions */}
            <div className="flex items-center justify-center space-x-2 sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const matchText = `Watching ${match.homeTeam} vs ${match.awayTeam} LIVE! ${match.homeScore}-${match.awayScore} 🔥⚽`;
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      matchText
                    )}&url=${encodeURIComponent(window.location.href)}`,
                    "_blank"
                  );
                }}
                className="text-blue-500"
              >
                <svg
                  className="h-4 w-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Tweet
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-1" />
                Like
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 xl:w-96 bg-gray-900 border-l border-gray-800">
          <Tabs defaultValue="chat" className="h-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="chat">Live Chat</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>

            <TabsContent
              value="chat"
              className="h-[calc(100vh-160px)] flex flex-col"
            >
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-blue-400 text-xs">
                        {msg.user}
                      </span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <div className="text-gray-300 text-sm">{msg.message}</div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="bg-gray-800 border-gray-700 text-white text-sm"
                  />
                  <Button onClick={sendMessage} size="sm">
                    Send
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="stats"
              className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-160px)]"
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm">Match Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Possession</span>
                      <span>
                        {match.possession?.home || 58}% -{" "}
                        {match.possession?.away || 42}%
                      </span>
                    </div>
                    <Progress
                      value={match.possession?.home || 58}
                      className="h-2"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shots</span>
                    <span>
                      {match.shots?.home || 12} - {match.shots?.away || 8}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Corners</span>
                    <span>
                      {match.corners?.home || 6} - {match.corners?.away || 3}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fouls</span>
                    <span>
                      {match.fouls?.home || 8} - {match.fouls?.away || 11}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Events */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm">Recent Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {(
                      match.events || [
                        {
                          time: "78'",
                          type: "goal",
                          description: "Goal by K. De Bruyne",
                        },
                        {
                          time: "72'",
                          type: "yellow",
                          description: "Yellow card",
                        },
                        {
                          time: "67'",
                          type: "goal",
                          description: "Goal by E. Haaland",
                        },
                      ]
                    )
                      .slice(-3)
                      .reverse()
                      .map((event, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 text-sm"
                        >
                          <span className="font-mono text-gray-400 w-8 text-xs">
                            {event.time}
                          </span>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              event.type === "goal"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          />
                          <span className="flex-1 text-xs">
                            {event.description}
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Chat/Stats Overlay */}
        {showMobileChat && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowMobileChat(false)}
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-xl max-h-[70vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h3 className="font-semibold">Live Chat & Stats</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileChat(false)}
                >
                  ✕
                </Button>
              </div>

              <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800 mx-4 mt-2">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                </TabsList>

                <TabsContent
                  value="chat"
                  className="flex-1 flex flex-col px-4 pb-4"
                >
                  {/* Mobile Chat Messages */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-3 max-h-60">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-blue-400 text-xs">
                            {msg.user}
                          </span>
                          <span className="text-xs text-gray-500">
                            {msg.time}
                          </span>
                        </div>
                        <div className="text-gray-300 text-sm">
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Chat Input */}
                  <div className="flex space-x-2 pt-2 border-t border-gray-800">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="bg-gray-800 border-gray-700 text-white text-sm"
                    />
                    <Button onClick={sendMessage} size="sm">
                      Send
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent
                  value="stats"
                  className="flex-1 p-4 space-y-4 overflow-y-auto"
                >
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Match Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Possession</span>
                          <span>
                            {match.possession?.home || 58}% -{" "}
                            {match.possession?.away || 42}%
                          </span>
                        </div>
                        <Progress
                          value={match.possession?.home || 58}
                          className="h-2"
                        />
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Shots</span>
                          <span>
                            {match.shots?.home || 12} - {match.shots?.away || 8}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Corners</span>
                          <span>
                            {match.corners?.home || 6} -{" "}
                            {match.corners?.away || 3}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fouls</span>
                          <span>
                            {match.fouls?.home || 8} - {match.fouls?.away || 11}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mobile Recent Events */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-sm">Recent Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {(
                          match.events || [
                            {
                              time: "78'",
                              type: "goal",
                              description: "Goal by K. De Bruyne",
                            },
                            {
                              time: "72'",
                              type: "yellow",
                              description: "Yellow card",
                            },
                            {
                              time: "67'",
                              type: "goal",
                              description: "Goal by E. Haaland",
                            },
                          ]
                        )
                          .slice(-3)
                          .reverse()
                          .map((event, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 text-sm"
                            >
                              <span className="font-mono text-gray-400 w-8 text-xs">
                                {event.time}
                              </span>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  event.type === "goal"
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                }`}
                              />
                              <span className="flex-1 text-xs">
                                {event.description}
                              </span>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-red-600 mb-4">FootyFlix</h3>
              <p className="text-gray-400 mb-4">
                Your ultimate destination for live football streaming. Watch
                matches from top leagues around the world.
              </p>
              <div className="flex space-x-4">
                {/* X (Twitter) */}
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#1da1f2] hover:bg-[#1da1f2]/20"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </Button>
                </a>
                {/* WhatsApp */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-500 hover:bg-green-500/20"
                  onClick={() => {
                    const text =
                      "Watch live football matches on FootyFlix! " +
                      window.location.href;
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(text)}`,
                      "_blank"
                    );
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.52 3.48A11.77 11.77 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.21-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.69.96.99-3.59-.25-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.29c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.43-.86-.77-1.44-1.72-1.61-2-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.28 1.23.45 1.65.58.69.22 1.32.19 1.82.12.56-.08 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.11-.26-.18-.55-.33z" />
                  </svg>
                </Button>
                {/* Facebook */}
                <a
                  href="https://x.com/footyfrenzynow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#1877f3] hover:bg-[#1877f3]/20"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </Button>
                </a>
                {/* Telegram */}
                <a
                  href="https://t.me/footyfrenzy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#229ED9] hover:bg-[#229ED9]/20"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.993 16.2l-.396 4.01c.567 0 .813-.244 1.11-.537l2.664-2.53 5.522 4.03c1.012.557 1.73.264 1.98-.937l3.59-16.8c.327-1.51-.547-2.1-1.53-1.74L1.37 9.27c-1.48.58-1.46 1.41-.252 1.78l4.59 1.43 10.65-6.7c.5-.33.96-.15.58.21" />
                    </svg>
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 FootyFlix. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Built by{" "}
              <a
                href="https://my-portfolio-phi-flax.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300"
              >
                Omoare Daniel
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
