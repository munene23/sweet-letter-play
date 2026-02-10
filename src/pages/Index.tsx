import { useState } from "react";
import { Heart } from "lucide-react";

const FloatingHeart = ({ delay, left }: { delay: number; left: string }) => (
  <div
    className="heart-particle animate-float-heart"
    style={{
      left,
      bottom: "0",
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
    }}
  >
    ❤️
  </div>
);

const Envelope = ({
  onClick,
  opened,
}: {
  onClick: () => void;
  opened: boolean;
}) => (
  <div className="relative cursor-pointer group" onClick={onClick}>
    {/* Envelope body */}
    <div className="w-72 h-48 sm:w-96 sm:h-56 bg-secondary rounded-lg border border-border relative overflow-visible shadow-[0_0_40px_hsl(var(--primary)/0.2)]">
      {/* Inner card peek */}
      <div className="absolute inset-4 bg-card rounded border border-border flex items-center justify-center">
        <p className="font-script text-2xl sm:text-3xl text-primary">
          Open me 💌
        </p>
      </div>

      {/* Bottom flap */}
      <div
        className="absolute bottom-0 left-0 w-0 h-0"
        style={{
          borderLeft: "clamp(9rem, 50vw, 12rem) solid transparent",
          borderRight: "clamp(9rem, 50vw, 12rem) solid transparent",
          borderBottom: `7rem solid hsl(var(--muted))`,
        }}
      />

      {/* Top flap */}
      <div
        className={`absolute top-0 left-0 w-full origin-top transition-transform duration-1000 ease-in-out ${
          opened ? "animate-envelope-flap" : ""
        }`}
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        <div
          className="w-0 h-0 mx-auto"
          style={{
            borderLeft: "clamp(9rem, 50vw, 12rem) solid transparent",
            borderRight: "clamp(9rem, 50vw, 12rem) solid transparent",
            borderTop: `7rem solid hsl(var(--muted))`,
          }}
        />
      </div>
    </div>

    {/* Glow effect on hover */}
    {!opened && (
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_60px_hsl(var(--primary)/0.4)] pointer-events-none" />
    )}
  </div>
);

const PhotoPlaceholder = ({ label }: { label: string }) => (
  <div className="w-40 h-52 sm:w-48 sm:h-60 bg-secondary border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors duration-300 rotate-[-2deg] hover:rotate-0 shadow-lg">
    <Heart className="w-8 h-8 text-muted-foreground" />
    <span className="text-sm text-muted-foreground text-center px-2">
      {label}
    </span>
  </div>
);

const LoveLetter = () => (
  <div className="max-w-lg mx-auto text-center space-y-6 px-4">
    <h2 className="font-script text-5xl sm:text-7xl text-primary animate-fade-in-up">
      Camilla
    </h2>

    <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
      <Heart className="w-10 h-10 text-primary mx-auto animate-heartbeat" />
    </div>

    <p
      className="text-lg sm:text-xl text-foreground/90 leading-relaxed animate-fade-in-up"
      style={{ animationDelay: "0.6s" }}
    >
     I wouldn’t be who I am today without you, you’ve given me strength, joy, and a home in your heart.
I love you more than words can ever say, and I want to spend every Valentine’s Day, every day, forever with you.
    </p>

    <p
      className="text-2xl sm:text-3xl font-script text-primary animate-fade-in-up"
      style={{ animationDelay: "0.9s" }}
    >
      Will you be my Valentine? 💕
    </p>

    {/* Photo section */}
  <div className="flex gap-4">
  <div className="w-64 h-64 rounded-xl shadow-lg overflow-hidden">
    <img
      src="/images/photo 1.jpeg"
      alt="Our photo"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="w-64 h-64 rounded-xl shadow-lg overflow-hidden">
    <img
      src="/images/photo 2.jpeg"
      alt="Another memory"
      className="w-full h-full object-cover"
    />
  </div>
</div>

    <p
      className="text-muted-foreground text-sm pt-6 animate-fade-in-up"
      style={{ animationDelay: "1.5s" }}
    >
      Forever yours ❤️
    </p>
  </div>
);

const Index = () => {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [hearts, setHearts] = useState<
    { id: number; delay: number; left: string }[]
  >([]);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    // Spawn floating hearts
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      left: `${10 + Math.random() * 80}%`,
    }));
    setHearts(newHearts);

    setTimeout(() => setShowLetter(true), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden relative py-12">
      {/* Subtle radial glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Floating hearts */}
      {hearts.map((h) => (
        <FloatingHeart key={h.id} delay={h.delay} left={h.left} />
      ))}

      {!showLetter ? (
        <div className="flex flex-col items-center gap-6 z-10">
          <h1 className="font-script text-4xl sm:text-5xl text-primary animate-heartbeat">
            A Letter For You
          </h1>
          <Envelope onClick={handleOpen} opened={opened} />
          {!opened && (
            <p className="text-muted-foreground text-sm animate-pulse">
              Tap to open
            </p>
          )}
        </div>
      ) : (
        <div className="z-10 animate-fade-in-up">
          <LoveLetter />
        </div>
      )}
    </div>
  );
};

export default Index;
