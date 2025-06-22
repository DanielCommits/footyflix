"use client"

import { useState } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

interface WatchPageProps {
  match: any
  onBack: () => void
}

export default function WatchPage({ match, onBack }: WatchPageProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [showMobileChat, setShowMobileChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { user: "FootballFan23", message: "What a goal by Haaland! 🔥", time: "2m ago" },
    { user: "LiverpoolRed", message: "Come on Liverpool! YNWA", time: "3m ago" },
    { user: "CityBlue", message: "De Bruyne is pure magic", time: "5m ago" },
    { user: "PremierLeagueFan", message: "Best match of the season!", time: "7m ago" },
  ])

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([{ user: "You", message: chatMessage, time: "now" }, ...chatMessages])
      setChatMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - Responsive */}
      <div className="flex items-center justify-between p-3 md:p-4 bg-black/90 border-b border-gray-800">
        <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
          <Button variant="ghost" size="icon" onClick={onBack} className="flex-shrink-0">
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
            <Button variant="ghost" size="icon" onClick={() => setShowMobileChat(!showMobileChat)} className="relative">
              {showMobileChat ? <BarChart3 className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
            </Button>
          </div>

          {/* Social Share - Hidden on small screens */}
          <div className="hidden sm:flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const matchText = `Watching ${match.homeTeam} vs ${match.awayTeam} LIVE! ${match.homeScore}-${match.awayScore} 🔥⚽ #${match.league.replace(/\s+/g, "")}`
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(matchText)}&url=${encodeURIComponent(window.location.href)}`,
                  "_blank",
                )
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
                <div className="text-xs sm:text-sm md:text-lg text-gray-400">Live Football Stream</div>
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
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8 md:h-10 md:w-10">
                    <Settings className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8 md:h-10 md:w-10">
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
                <div className="text-gray-400 hidden sm:block truncate">{match.stadium}</div>
              </div>
            </div>

            {/* Quick Stats - Mobile */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 text-center mb-3 md:mb-4">
              <div>
                <div className="text-lg md:text-2xl font-bold text-blue-400">{match.possession?.home || 58}%</div>
                <div className="text-xs text-gray-400">Possession</div>
              </div>
              <div>
                <div className="text-lg md:text-2xl font-bold">
                  {match.homeScore} - {match.awayScore}
                </div>
                <div className="text-xs text-gray-400">Score</div>
              </div>
              <div>
                <div className="text-lg md:text-2xl font-bold text-red-400">{match.possession?.away || 42}%</div>
                <div className="text-xs text-gray-400">Possession</div>
              </div>
            </div>

            {/* Mobile Social Actions */}
            <div className="flex items-center justify-center space-x-2 sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const matchText = `Watching ${match.homeTeam} vs ${match.awayTeam} LIVE! ${match.homeScore}-${match.awayScore} 🔥⚽`
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(matchText)}&url=${encodeURIComponent(window.location.href)}`,
                    "_blank",
                  )
                }}
                className="text-blue-500"
              >
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
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

            <TabsContent value="chat" className="h-[calc(100vh-160px)] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-blue-400 text-xs">{msg.user}</span>
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

            <TabsContent value="stats" className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-160px)]">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm">Match Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Possession</span>
                      <span>
                        {match.possession?.home || 58}% - {match.possession?.away || 42}%
                      </span>
                    </div>
                    <Progress value={match.possession?.home || 58} className="h-2" />
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
                        { time: "78'", type: "goal", description: "Goal by K. De Bruyne" },
                        { time: "72'", type: "yellow", description: "Yellow card" },
                        { time: "67'", type: "goal", description: "Goal by E. Haaland" },
                      ]
                    )
                      .slice(-3)
                      .reverse()
                      .map((event, index) => (
                        <div key={index} className="flex items-center space-x-3 text-sm">
                          <span className="font-mono text-gray-400 w-8 text-xs">{event.time}</span>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              event.type === "goal" ? "bg-green-500" : "bg-yellow-500"
                            }`}
                          />
                          <span className="flex-1 text-xs">{event.description}</span>
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
          <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowMobileChat(false)}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-xl max-h-[70vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h3 className="font-semibold">Live Chat & Stats</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowMobileChat(false)}>
                  ✕
                </Button>
              </div>

              <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800 mx-4 mt-2">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="flex-1 flex flex-col px-4 pb-4">
                  {/* Mobile Chat Messages */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-3 max-h-60">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-blue-400 text-xs">{msg.user}</span>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <div className="text-gray-300 text-sm">{msg.message}</div>
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

                <TabsContent value="stats" className="flex-1 p-4 space-y-4 overflow-y-auto">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-sm">Match Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Possession</span>
                          <span>
                            {match.possession?.home || 58}% - {match.possession?.away || 42}%
                          </span>
                        </div>
                        <Progress value={match.possession?.home || 58} className="h-2" />
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
                            {match.corners?.home || 6} - {match.corners?.away || 3}
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
                            { time: "78'", type: "goal", description: "Goal by K. De Bruyne" },
                            { time: "72'", type: "yellow", description: "Yellow card" },
                            { time: "67'", type: "goal", description: "Goal by E. Haaland" },
                          ]
                        )
                          .slice(-3)
                          .reverse()
                          .map((event, index) => (
                            <div key={index} className="flex items-center space-x-3 text-sm">
                              <span className="font-mono text-gray-400 w-8 text-xs">{event.time}</span>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  event.type === "goal" ? "bg-green-500" : "bg-yellow-500"
                                }`}
                              />
                              <span className="flex-1 text-xs">{event.description}</span>
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
    </div>
  )
}
