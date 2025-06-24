"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  Play,
  Share2,
  Info,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WatchPage from "./watch-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Component() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showShortcutHint, setShowShortcutHint] = useState(true);
  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const [currentView, setCurrentView] = useState("home");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [reminders, setReminders] = useState(new Set());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const liveMatches = [
    {
      id: 1,
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      homeScore: 2,
      awayScore: 1,
      time: "78'",
      league: "Premier League",
      viewers: "2.3M",
      isLive: true,
      stadium: "Etihad Stadium",
      possession: { home: 58, away: 42 },
      shots: { home: 12, away: 8 },
      corners: { home: 6, away: 3 },
      fouls: { home: 8, away: 11 },
      events: [
        {
          time: "12'",
          type: "goal",
          team: "home",
          player: "Haaland",
          description: "Goal by E. Haaland",
        },
        {
          time: "34'",
          type: "goal",
          team: "away",
          player: "Salah",
          description: "Goal by M. Salah",
        },
        {
          time: "67'",
          type: "goal",
          team: "home",
          player: "De Bruyne",
          description: "Goal by K. De Bruyne",
        },
        {
          time: "72'",
          type: "yellow",
          team: "away",
          player: "Henderson",
          description: "Yellow card for J. Henderson",
        },
      ],
    },
    {
      id: 2,
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      homeScore: 1,
      awayScore: 1,
      time: "45'",
      league: "La Liga",
      viewers: "3.1M",
      isLive: true,
      stadium: "Camp Nou",
      possession: { home: 65, away: 35 },
      shots: { home: 8, away: 6 },
      corners: { home: 4, away: 2 },
      fouls: { home: 6, away: 9 },
      events: [
        {
          time: "23'",
          type: "goal",
          team: "home",
          player: "Lewandowski",
          description: "Goal by R. Lewandowski",
        },
        {
          time: "41'",
          type: "goal",
          team: "away",
          player: "Benzema",
          description: "Goal by K. Benzema",
        },
      ],
    },
    {
      id: 3,
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      homeScore: 3,
      awayScore: 0,
      time: "FT",
      league: "Bundesliga",
      viewers: "1.8M",
      isLive: false,
      stadium: "Allianz Arena",
      possession: { home: 72, away: 28 },
      shots: { home: 15, away: 4 },
      corners: { home: 8, away: 1 },
      fouls: { home: 7, away: 12 },
      events: [
        {
          time: "15'",
          type: "goal",
          team: "home",
          player: "Müller",
          description: "Goal by T. Müller",
        },
        {
          time: "38'",
          type: "goal",
          team: "home",
          player: "Sané",
          description: "Goal by L. Sané",
        },
        {
          time: "82'",
          type: "goal",
          team: "home",
          player: "Musiala",
          description: "Goal by J. Musiala",
        },
      ],
    },
    {
      id: 4,
      homeTeam: "Juventus",
      awayTeam: "AC Milan",
      homeScore: 0,
      awayScore: 2,
      time: "62'",
      league: "Serie A",
      viewers: "1.2M",
      isLive: true,
      stadium: "Allianz Stadium",
      possession: { home: 45, away: 55 },
      shots: { home: 6, away: 10 },
      corners: { home: 3, away: 5 },
      fouls: { home: 9, away: 7 },
      events: [
        {
          time: "28'",
          type: "goal",
          team: "away",
          player: "Leão",
          description: "Goal by R. Leão",
        },
        {
          time: "55'",
          type: "goal",
          team: "away",
          player: "Giroud",
          description: "Goal by O. Giroud",
        },
        {
          time: "60'",
          type: "yellow",
          team: "home",
          player: "Rabiot",
          description: "Yellow card for A. Rabiot",
        },
      ],
    },
  ];

  const upcomingMatches = [
    {
      id: 5,
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      time: "15:30",
      date: "Today",
      league: "Premier League",
      stadium: "Emirates Stadium",
      image: "/images/stadium-1.jpg",
    },
    {
      id: 6,
      homeTeam: "PSG",
      awayTeam: "Marseille",
      time: "20:00",
      date: "Today",
      league: "Ligue 1",
      stadium: "Parc des Princes",
      image: "/images/stadium-2.jpg",
    },
    {
      id: 7,
      homeTeam: "Atletico Madrid",
      awayTeam: "Valencia",
      time: "18:00",
      date: "Tomorrow",
      league: "La Liga",
      stadium: "Wanda Metropolitano",
      image: "/images/stadium-3.jpg",
    },
  ];

  const watchMatch = (match) => {
    setSelectedMatch(match);
    setCurrentView("watch");
  };

  const goBack = () => {
    setCurrentView("home");
    setSelectedMatch(null);
  };

  const setReminder = (matchId, matchInfo) => {
    const newReminders = new Set(reminders);
    if (reminders.has(matchId)) {
      newReminders.delete(matchId);
      setNotificationMessage(
        `Reminder removed for ${matchInfo.homeTeam} vs ${matchInfo.awayTeam}`
      );
    } else {
      newReminders.add(matchId);
      setNotificationMessage(
        `Reminder set for ${matchInfo.homeTeam} vs ${matchInfo.awayTeam} at ${matchInfo.time}`
      );

      // Request notification permission if not already granted
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "default"
      ) {
        Notification.requestPermission();
      }
    }
    setReminders(newReminders);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const addToCalendar = (match, provider = "ics") => {
    const startDate = new Date();
    const [hours, minutes] = match.time.split(":").map(Number);

    // Set match date (assuming today/tomorrow based on match.date)
    if (match.date === "Tomorrow") {
      startDate.setDate(startDate.getDate() + 1);
    }
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

    const eventDetails = {
      title: `${match.homeTeam} vs ${match.awayTeam}`,
      description: `${match.league} match at ${match.stadium}. Watch live on FootyFlix!`,
      location: match.stadium,
      startDate: startDate,
      endDate: endDate,
      url: window.location.href,
    };

    if (provider === "google") {
      addToGoogleCalendar(eventDetails);
    } else if (provider === "outlook") {
      addToOutlookCalendar(eventDetails);
    } else {
      downloadICSFile(eventDetails);
    }
  };

  const formatDateForCalendar = (date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const addToGoogleCalendar = (event) => {
    const googleUrl = new URL("https://calendar.google.com/calendar/render");
    googleUrl.searchParams.set("action", "TEMPLATE");
    googleUrl.searchParams.set("text", event.title);
    googleUrl.searchParams.set(
      "dates",
      `${formatDateForCalendar(event.startDate)}/${formatDateForCalendar(
        event.endDate
      )}`
    );
    googleUrl.searchParams.set("details", event.description);
    googleUrl.searchParams.set("location", event.location);
    googleUrl.searchParams.set("sprop", "website:" + event.url);

    window.open(googleUrl.toString(), "_blank");
  };

  const addToOutlookCalendar = (event) => {
    const outlookUrl = new URL(
      "https://outlook.live.com/calendar/0/deeplink/compose"
    );
    outlookUrl.searchParams.set("subject", event.title);
    outlookUrl.searchParams.set("startdt", event.startDate.toISOString());
    outlookUrl.searchParams.set("enddt", event.endDate.toISOString());
    outlookUrl.searchParams.set("body", event.description);
    outlookUrl.searchParams.set("location", event.location);

    window.open(outlookUrl.toString(), "_blank");
  };

  const downloadICSFile = (event) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FootyFlix//Football Match//EN
BEGIN:VEVENT
UID:${Date.now()}@footyflix.com
DTSTAMP:${formatDateForCalendar(new Date())}
DTSTART:${formatDateForCalendar(event.startDate)}
DTEND:${formatDateForCalendar(event.endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
URL:${event.url}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotificationMessage(`Calendar event downloaded for ${event.title}`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const getActiveReminders = () => {
    return upcomingMatches.filter((match) => reminders.has(match.id));
  };

  // Check for match start times and send notifications
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      getActiveReminders().forEach((match) => {
        const [hours, minutes] = match.time.split(":").map(Number);
        const matchTime = hours * 60 + minutes;
        const timeDiff = matchTime - currentTime;

        // Notify 15 minutes before match starts
        if (
          timeDiff === 15 &&
          typeof window !== "undefined" &&
          "Notification" in window &&
          Notification.permission === "granted"
        ) {
          new Notification(`Match Starting Soon!`, {
            body: `${match.homeTeam} vs ${match.awayTeam} starts in 15 minutes`,
            icon: "/placeholder.svg?height=64&width=64",
          });
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) or Ctrl+K (Windows/Linux) to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();

        // Focus desktop search if visible, otherwise open mobile search
        if (window.innerWidth >= 768) {
          desktopSearchRef.current?.focus();
        } else {
          setSearchOpen(true);
          // Small delay to ensure the input is rendered before focusing
          setTimeout(() => {
            mobileSearchRef.current?.focus();
          }, 100);
        }
      }

      // Escape to close mobile search or blur desktop search
      if (e.key === "Escape") {
        if (searchOpen) {
          setSearchOpen(false);
        } else if (document.activeElement === desktopSearchRef.current) {
          desktopSearchRef.current?.blur();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  // Detect if user is on Mac for shortcut display
  const isMac =
    typeof window !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const shortcutKey = isMac ? "⌘K" : "Ctrl+K";

  if (currentView === "watch" && selectedMatch) {
    return <WatchPage match={selectedMatch} onBack={goBack} />;
  }

  return (
    <div className="min-h-screen bg-black text-white touch-action: manipulation; -webkit-user-select: none; -webkit-touch-callout: none;">
      {/* Navigation */}
      <nav className="w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main navbar */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl md:text-2xl font-bold text-red-600">
                FootyFlix
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  ref={desktopSearchRef}
                  placeholder={`Search matches, teams...`}
                  className="pl-10 pr-16 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 w-64 lg:w-80 h-10"
                  onFocus={() => setShowShortcutHint(false)}
                  onBlur={() => setShowShortcutHint(true)}
                />
                {showShortcutHint && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded border border-gray-600">
                    {shortcutKey}
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10"
              >
                <Bell className="h-5 w-5" />
                {getActiveReminders().length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getActiveReminders().length}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Navigation - Show notification and user icons on tablet+ */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="h-10 w-10"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 hidden sm:flex"
              >
                <Bell className="h-5 w-5" />
                {getActiveReminders().length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getActiveReminders().length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="md:hidden pb-4 border-t border-gray-800 pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  ref={mobileSearchRef}
                  placeholder="Search matches, teams..."
                  className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 w-full h-12"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-right">
          {notificationMessage}
        </div>
      )}

      {/* Hero Section with Match Details */}
      <div className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/hero-bg.jpg')`,
            backgroundBlendMode: "overlay",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          <div className="max-w-2xl">
            <Badge className="mb-2 md:mb-4 bg-red-600 hover:bg-red-700 text-xs md:text-sm">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
              LIVE NOW
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 md:mb-4">
              Manchester City vs Liverpool
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-300 mb-2">
              Premier League • Etihad Stadium
            </p>
            <div className="flex items-center space-x-2 md:space-x-4 mb-4 md:mb-6">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                2 - 1
              </div>
              <div className="text-sm sm:text-base lg:text-lg text-gray-400">
                78' • 2.3M viewers
              </div>
            </div>
            <p className="text-gray-300 mb-4 md:mb-6 text-sm sm:text-base lg:text-lg hidden sm:block">
              An intense Premier League clash as Manchester City takes on
              Liverpool in what promises to be the match of the season.
            </p>

            {/* Social Sharing */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-sm text-gray-400">Share:</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:bg-blue-400/20"
                onClick={() => {
                  navigator.share?.({
                    title: "Manchester City vs Liverpool - Live",
                    text: "Watch this amazing match live on FootyFlix!",
                    url: window.location.href,
                  }) || navigator.clipboard.writeText(window.location.href);
                }}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500 hover:bg-blue-500/20"
                onClick={() => {
                  const text = `Watching Manchester City vs Liverpool LIVE! 2-1 in the 78th minute. What a match! 🔥⚽ #MCILIV #PremierLeague`;
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      text
                    )}&url=${encodeURIComponent(window.location.href)}`,
                    "_blank"
                  );
                }}
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
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-600/20"
                onClick={() => {
                  const text = `Watching Manchester City vs Liverpool LIVE! Amazing match 🔥⚽`;
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}&quote=${encodeURIComponent(text)}`,
                    "_blank"
                  );
                }}
              >
                <svg
                  className="h-4 w-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200"
                onClick={() => watchMatch(liveMatches[0])}
              >
                <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Watch Live
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
                onClick={() => setShowMatchDetails(true)}
              >
                <Info className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Match Details
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Reminders Section */}
      {getActiveReminders().length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-900/50">
          <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-yellow-500" />
            Your Reminders ({getActiveReminders().length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {getActiveReminders().map((match) => (
              <Card key={match.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant="outline"
                      className="border-yellow-500 text-yellow-400 text-xs"
                    >
                      {match.league}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReminder(match.id, match)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Remove reminder"
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold mb-1 text-sm">
                      {match.homeTeam} vs {match.awayTeam}
                    </div>
                    <div className="text-lg font-bold text-yellow-400">
                      {match.time}
                    </div>
                    <div className="text-xs text-gray-400">
                      {match.date} • {match.stadium}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Match Details Modal */}
      <Dialog open={showMatchDetails} onOpenChange={setShowMatchDetails}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold flex items-center justify-between">
              <span>Manchester City vs Liverpool</span>
              <Badge className="bg-red-600 hover:bg-red-700">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                LIVE
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Match Header */}
            <div className="text-center border-b border-gray-800 pb-4">
              <div className="flex items-center justify-center space-x-4 mb-2">
                <div className="text-3xl md:text-4xl font-bold">2 - 1</div>
              </div>
              <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm md:text-base">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  78'
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Etihad Stadium
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  2.3M viewers
                </div>
              </div>
            </div>

            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="lineups">Lineups</TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Match Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Possession</span>
                          <span>58% - 42%</span>
                        </div>
                        <div className="flex h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-500 h-full"
                            style={{ width: "58%" }}
                          />
                          <div
                            className="bg-red-500 h-full"
                            style={{ width: "42%" }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-400">
                            12
                          </div>
                          <div className="text-sm text-gray-400">Shots</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">2-1</div>
                          <div className="text-sm text-gray-400">Score</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-400">
                            8
                          </div>
                          <div className="text-sm text-gray-400">Shots</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-between">
                          <span>Corners</span>
                          <span>6 - 3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fouls</span>
                          <span>8 - 11</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-2 bg-gray-700 rounded text-sm">
                          <span className="font-mono text-xs bg-gray-600 px-2 py-1 rounded">
                            78'
                          </span>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <span className="flex-1">
                            Yellow card - J. Henderson (Liverpool)
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 p-2 bg-gray-700 rounded text-sm">
                          <span className="font-mono text-xs bg-gray-600 px-2 py-1 rounded">
                            67'
                          </span>
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="flex-1">
                            ⚽ Goal - K. De Bruyne (Manchester City)
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 p-2 bg-gray-700 rounded text-sm">
                          <span className="font-mono text-xs bg-gray-600 px-2 py-1 rounded">
                            34'
                          </span>
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="flex-1">
                            ⚽ Goal - M. Salah (Liverpool)
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 p-2 bg-gray-700 rounded text-sm">
                          <span className="font-mono text-xs bg-gray-600 px-2 py-1 rounded">
                            12'
                          </span>
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="flex-1">
                            ⚽ Goal - E. Haaland (Manchester City)
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-4 mt-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Match Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                        <span className="font-mono text-sm bg-gray-600 px-2 py-1 rounded">
                          78'
                        </span>
                        <div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">
                            Yellow card - J. Henderson
                          </div>
                          <div className="text-sm text-gray-400">Liverpool</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                        <span className="font-mono text-sm bg-gray-600 px-2 py-1 rounded">
                          67'
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                        <span className="font-mono text-sm bg-gray-600 px-2 py-1 rounded">
                          67'
                        </span>
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div className="flex-1">
                          <div className="font-semibold">
                            ⚽ Goal - K. De Bruyne
                          </div>
                          <div className="text-sm text-gray-400">
                            Manchester City
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                        <span className="font-mono text-sm bg-gray-600 px-2 py-1 rounded">
                          34'
                        </span>
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div className="flex-1">
                          <div className="font-semibold">
                            ⚽ Goal - M. Salah
                          </div>
                          <div className="text-sm text-gray-400">Liverpool</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                        <span className="font-mono text-sm bg-gray-600 px-2 py-1 rounded">
                          12'
                        </span>
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div className="flex-1">
                          <div className="font-semibold">
                            ⚽ Goal - E. Haaland
                          </div>
                          <div className="text-sm text-gray-400">
                            Manchester City
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lineups" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-blue-400">
                        Manchester City
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          "Ederson",
                          "Walker",
                          "Stones",
                          "Dias",
                          "Cancelo",
                          "Rodri",
                          "De Bruyne",
                          "Bernardo",
                          "Mahrez",
                          "Haaland",
                          "Grealish",
                        ].map((player, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-2 bg-gray-700 rounded"
                          >
                            <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                              {index + 1}
                            </span>
                            <span>{player}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-red-400">Liverpool</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          "Alisson",
                          "Alexander-Arnold",
                          "Van Dijk",
                          "Konate",
                          "Robertson",
                          "Fabinho",
                          "Henderson",
                          "Thiago",
                          "Salah",
                          "Nunez",
                          "Diaz",
                        ].map((player, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-2 bg-gray-700 rounded"
                          >
                            <span className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                              {index + 1}
                            </span>
                            <span>{player}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Live Matches */}
        <section className="mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
            <div className="w-3 h-3 bg-red-600 rounded-full mr-3 animate-pulse" />
            Live Now
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {liveMatches.map((match) => (
              <Card
                key={match.id}
                className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer group"
                onClick={() => watchMatch(match)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={
                        match.id === 1
                          ? `/images/match-1.jpg`
                          : match.id === 2
                          ? `/images/match-2.jpg`
                          : match.id === 3
                          ? `/images/match-3.jpg`
                          : `/images/match-4.jpg`
                      }
                      alt={`${match.homeTeam} vs ${match.awayTeam}`}
                      className="w-full h-32 sm:h-40 object-cover rounded-t-lg"
                    />
                    {match.isLive && (
                      <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-xs">
                        <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                        LIVE
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-t-lg flex items-center justify-center">
                      <Play className="h-8 w-8 md:h-12 md:w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs md:text-sm text-gray-400 truncate">
                        {match.league}
                      </span>
                      <span className="text-xs md:text-sm text-gray-400">
                        {match.viewers}
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold mb-1 text-sm md:text-base truncate">
                        {match.homeTeam} vs {match.awayTeam}
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-white">
                        {match.homeScore} - {match.awayScore}
                      </div>
                      <div className="text-xs md:text-sm text-gray-400 mt-1">
                        {match.time}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Matches */}
        <section className="mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Coming Up Today
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {upcomingMatches.map((match) => (
              <Card
                key={match.id}
                className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <CardContent className="p-3 md:p-4">
                  <div className="relative mb-3">
                    <img
                      src={match.image || "/placeholder.svg"}
                      alt={match.stadium}
                      className="w-full h-24 sm:h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-lg" />
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <Badge
                      variant="outline"
                      className="border-gray-600 text-gray-300 text-xs"
                    >
                      {match.league}
                    </Badge>
                    <span className="text-xs md:text-sm text-gray-400">
                      {match.date}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold mb-2 text-sm md:text-base">
                      {match.homeTeam} vs {match.awayTeam}
                    </div>
                    <div className="text-lg md:text-xl font-bold text-green-400">
                      {match.time}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {match.stadium}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 mt-3 md:mt-4">
                    <Button
                      className={`w-full text-sm ${
                        reminders.has(match.id)
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "border-gray-600 text-gray-300 hover:bg-gray-800"
                      }`}
                      variant={reminders.has(match.id) ? "default" : "outline"}
                      onClick={() => setReminder(match.id, match)}
                    >
                      {reminders.has(match.id)
                        ? "✓ Reminder Set"
                        : "Set Reminder"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Live Matches
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Upcoming Games
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Leagues
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Teams
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Highlights
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="https://my-portfolio-phi-flax.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    Developer Portfolio
                    <svg
                      className="h-4 w-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 FootyFlix. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Built by{" "}
              <a
                href="https://my-portfolio-phi-flax.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                Omoare Daniel a.k.a D4nRick
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
