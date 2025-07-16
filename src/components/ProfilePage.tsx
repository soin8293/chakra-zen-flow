import { UserProfile } from "@/types/chakra";
import { Button } from "./ui/button";
import { ArrowLeft, Award, Calendar, Clock, Heart } from "lucide-react";

interface ProfilePageProps {
  profile: UserProfile;
  onBack: () => void;
}

export function ProfilePage({ profile, onBack }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-gradient-meditation">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border/50">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-muted"
          onClick={onBack}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-foreground ml-4">Your Progress</h1>
      </div>

      {/* Profile content */}
      <div className="p-6 space-y-6">
        {/* Main stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">
              {profile.totalMinutesMeditated}
            </div>
            <div className="text-sm text-muted-foreground">Minutes Meditated</div>
          </div>

          <div className="bg-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">
              {profile.currentStreak}
            </div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Achievements
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-card-foreground">Longest Streak</div>
                <div className="text-sm text-muted-foreground">{profile.longestStreak} days</div>
              </div>
              <div className="text-2xl">🔥</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-card-foreground">Sessions Completed</div>
                <div className="text-sm text-muted-foreground">{profile.sessionsCompleted} sessions</div>
              </div>
              <div className="text-2xl">✨</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-card-foreground">Favorite Chakra</div>
                <div className="text-sm text-muted-foreground capitalize">{profile.favoritChakra} Chakra</div>
              </div>
              <div className="text-2xl">
                <Heart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Motivational message */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Keep up the great work! 🌟
          </h3>
          <p className="text-muted-foreground text-sm">
            Your meditation practice is helping you grow spiritually and emotionally.
          </p>
        </div>
      </div>
    </div>
  );
}