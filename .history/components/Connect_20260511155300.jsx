"use client";

import { useState, useEffect, useRef } from "react";
import "@fontsource/momo-signature";

// profile info
const PROFILES = [
  { id: 1, name: "hailey.r",  handle: "@hailey.reyes", avatar: "/hailey.png", side: "left"  },
  { id: 2, name: "carly.j",   handle: "@carlyyy_xo",   avatar: "/carly.png", side: "right" },
];

const QUEUE = [
  { id: 1, title: "Espresso",             artist: "Sabrina Carpenter" },
  { id: 2, title: "Feather",              artist: "Sabrina Carpenter" },
  { id: 3, title: "Good Graces",          artist: "Sabrina Carpenter" },
  { id: 4, title: "Please Please Please", artist: "Sabrina Carpenter" },
  { id: 5, title: "Nonsense",             artist: "Sabrina Carpenter" },
  { id: 6, title: "Bad for Business",     artist: "Sabrina Carpenter" },
  { id: 7, title: "Fast Times",           artist: "Sabrina Carpenter" },
];

const CHAT_INIT = [
  { id: 1, sender: "carly.j",  text: "omg I love this song 🎵" },
  { id: 2, sender: "hailey.r", text: "same!! it's been on repeat" },
  { id: 3, sender: "carly.j",  text: "add the next one to the queue?" },
];

// profile pictures
function ProfileBubble({ profile }) {
  const isLeft = profile.side === "left";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      flexDirection: isLeft ? "row" : "row-reverse",
    }}>
      <img
        src={profile.avatar} alt={profile.name}
        style={{
          width: 48, height: 48, borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.6)",
          objectFit: "cover",
          boxShadow: "0 0 18px rgba(160,80,255,0.6)",
          flexShrink: 0,
        }}
      />
      <div style={{ textAlign: isLeft ? "left" : "right" }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{profile.name}</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "monospace" }}>{profile.handle}</div>
      </div>
    </div>
  );
}

// music player
function MusicPlayer({ song, isPlaying, onToggle, onPrev, onNext, progress, onSeek }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.09)",
      backdropFilter: "blur(14px)",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: 16, padding: "16px 14px",
      width: 210, flexShrink: 0,
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      {/* Album cover */}
      <div style={{
        width: "100%", aspectRatio: "1", borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 6px 24px rgba(168,85,247,0.35)",
      }}>
        <img
          src="/shortn'sweetalbumcover.jpg"
          alt="Album cover"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {song.title}
        </div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>{song.artist}</div>
      </div>

      <div
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          onSeek((e.clientX - rect.left) / rect.width);
        }}
        style={{
          height: 4, background: "rgba(255,255,255,0.15)",
          borderRadius: 4, cursor: "pointer",
        }}
      >
        <div style={{
          width: `${progress * 100}%`, height: "100%",
          background: "#c084fc", borderRadius: 4,
          transition: "width .8s linear", pointerEvents: "none",
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18 }}>
        {[
          { icon: "⏮", fn: onPrev,   big: false },
          { icon: isPlaying ? "⏸" : "▶", fn: onToggle, big: true },
          { icon: "⏭", fn: onNext,   big: false },
        ].map(({ icon, fn, big }, i) => (
          <button key={i} onClick={fn} style={{
            background: big ? "rgba(192,132,252,0.28)" : "transparent",
            border: big ? "1px solid rgba(192,132,252,0.5)" : "none",
            color: "#fff", fontSize: big ? 17 : 14,
            width: big ? 38 : 30, height: big ? 38 : 30,
            borderRadius: "50%", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background .15s",
          }}>{icon}</button>
        ))}
      </div>
    </div>
  );
}

// song queue
function SongQueue({ queue, currentIdx, onSelect }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 16, width: 210, flexShrink: 0,
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      <div style={{
        color: "rgba(255,255,255,0.45)", fontSize: 9, fontWeight: 700,
        letterSpacing: "0.1em", padding: "10px 14px 6px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>QUEUE</div>
      <div style={{ overflowY: "auto", flex: 1 }}>
        {queue.map((song, i) => (
          <div key={song.id} onClick={() => onSelect(i)} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "7px 12px", cursor: "pointer",
            background: i === currentIdx ? "rgba(192,132,252,0.15)" : "transparent",
            transition: "background .15s",
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 5, flexShrink: 0,
              background: i === currentIdx ? "rgba(192,132,252,0.3)" : "rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10,
              color: i === currentIdx ? "#c084fc" : "rgba(255,255,255,0.35)",
            }}>{i === currentIdx ? "♪" : i + 1}</div>
            <div style={{ overflow: "hidden" }}>
              <div style={{
                color: i === currentIdx ? "#fff" : "rgba(255,255,255,0.72)",
                fontSize: 12, fontWeight: i === currentIdx ? 700 : 400,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>{song.title}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>{song.artist}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// chat
function Chat({ messages, onSend }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput("");
  }

  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 16, flex: 1, minWidth: 0,
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      <div style={{
        color: "rgba(255,255,255,0.45)", fontSize: 9, fontWeight: 700,
        letterSpacing: "0.1em", padding: "10px 14px 6px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>CHAT</div>

      <div style={{
        flex: 1, overflowY: "auto", padding: "10px 12px",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            alignSelf: msg.sender === "hailey.r" ? "flex-end" : "flex-start",
            maxWidth: "80%",
          }}>
            <div style={{
              background: msg.sender === "hailey.r" ? "rgba(192,132,252,0.3)" : "rgba(255,255,255,0.1)",
              borderRadius: msg.sender === "hailey.r" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              padding: "7px 11px", color: "#fff", fontSize: 12, lineHeight: 1.4,
            }}>{msg.text}</div>
            <div style={{
              color: "rgba(255,255,255,0.3)", fontSize: 9, marginTop: 2,
              textAlign: msg.sender === "hailey.r" ? "right" : "left",
              fontFamily: "monospace",
            }}>{msg.sender}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{
        display: "flex", gap: 6, padding: "8px 10px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message…"
          style={{
            flex: 1, background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8, padding: "7px 10px",
            color: "#fff", fontSize: 12, outline: "none",
          }}
        />
        <button onClick={handleSend} style={{
          background: "rgba(192,132,252,0.28)",
          border: "1px solid rgba(192,132,252,0.5)",
          borderRadius: 8, padding: "7px 12px",
          color: "#c084fc", cursor: "pointer", fontSize: 13,
        }}>↑</button>
      </div>
    </div>
  );
}

// connect
export default function Connect() {
  const [phase,      setPhase]      = useState("idle");
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress,   setProgress]   = useState(0);
  const [messages,   setMessages]   = useState(CHAT_INIT);
  const [msgId,      setMsgId]      = useState(100);
  const tickerRef   = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => { progressRef.current = progress; }, [progress]);

  useEffect(() => {
    clearInterval(tickerRef.current);
    if (phase !== "room" || !isPlaying) return;
    tickerRef.current = setInterval(() => {
      const next = progressRef.current + 1 / 180;
      if (next >= 1) {
        setCurrentIdx((i) => (i + 1) % QUEUE.length);
        setProgress(0);
        progressRef.current = 0;
      } else {
        setProgress(next);
      }
    }, 1000);
    return () => clearInterval(tickerRef.current);
  }, [phase, isPlaying]);

  // reset bar when track changes
  useEffect(() => {
    setProgress(0);
    progressRef.current = 0;
  }, [currentIdx]);

  function handleStartRoom() {
    setPhase("connecting");
    setTimeout(() => { setPhase("room"); setIsPlaying(true); }, 2200);
  }

  function handleLeave() {
    clearInterval(tickerRef.current);
    setPhase("idle");
    setIsPlaying(false);
    setCurrentIdx(0);
    setProgress(0);
    setMessages(CHAT_INIT);
    setMsgId(100);
  }

  function handleSeek(ratio) {
    const v = Math.max(0, Math.min(1, ratio));
    setProgress(v);
    progressRef.current = v;
  }

  function handleSend(text) {
    setMessages((prev) => [...prev, { id: msgId, sender: "hailey.r", text }]);
    setMsgId((n) => n + 1);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.google.com/specimen/Momo+Signature?preview.script=Latn');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #2a0a5e; }
        #cw {
          font-family: 'DM Sans', sans-serif;
          width: 100%; min-height: 100vh;
          background: linear-gradient(#190E32 0%,#915FFF 100%);
          position: relative; overflow: hidden;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(192,132,252,0.35); border-radius: 4px; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        @keyframes roomBorder {
          0%,100%{border-color:rgba(255,255,255,0.2)}
          50%{border-color:rgba(192,132,252,0.65)}
        }
        @keyframes btnGlow {
          0%,100%{box-shadow:0 0 0 0 rgba(192,132,252,0.5)}
          50%{box-shadow:0 0 0 10px rgba(192,132,252,0)}
        }
        @keyframes pulse {
          0%,100%{opacity:1} 50%{opacity:0.4}
        }
        .room-panel { animation: fadeIn .45s ease, roomBorder 3s ease infinite; }
        .start-btn  { animation: btnGlow 2.5s ease infinite; }
        .dot        { display:inline-block; animation: pulse 1s ease infinite; }
        .dot:nth-child(2){ animation-delay:.2s }
        .dot:nth-child(3){ animation-delay:.4s }
      `}</style>

      <div id="cw">

        {/* connect title */}
        <div style={{
          position:"absolute", top:18, right:26, zIndex:20, pointerEvents:"none",
          fontFamily:"Momo Signature", fontSize:36,
          color:"rgba(255,255,255,0.9)",
          textShadow:"0 2px 18px rgba(192,132,252,0.5)",
        }}>Connect</div>

        {/* connecting phase */}
        {phase !== "room" && (
          <>
            {/* hailey — top left */}
            <div style={{ position:"absolute", top:22, left:20 }}>
              <ProfileBubble profile={PROFILES[0]} />
            </div>

            {/* carly — bottom right */}
            <div style={{ position:"absolute", bottom:60, right:24 }}>
              <ProfileBubble profile={PROFILES[1]} />
            </div>

            {/* centre */}
            <div style={{
              position:"absolute", left:"50%", top:"50%",
              transform:"translate(-50%,-50%)", zIndex:10,
            }}>
              {phase === "idle" ? (
                <button
                  className="start-btn"
                  onClick={handleStartRoom}
                  style={{
                    background:"#915FFF",
                    border:"1px solid rgba(255,255,255,0.28)",
                    color:"#fff", borderRadius:22,
                    padding:"11px 24px", fontSize:13, fontWeight:600,
                    cursor:"pointer", backdropFilter:"blur(10px)",
                    lineHeight:1.5, textAlign:"center", transition:"background .2s",
                  }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(192,132,252,0.25)"}
                  onMouseLeave={e=>e.currentTarget.style.background="#915FFF"}
                >
                  Start new<br/>Melody Room
                </button>
              ) : (
                <div style={{
                  color:"rgba(255,255,255,0.65)", fontSize:13,
                  fontFamily:"monospace", letterSpacing:".1em",
                  display:"flex", alignItems:"center", gap:4,
                }}>
                  connecting
                  <span className="dot" style={{marginLeft:4}}>.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── melody room ── */}
        {phase === "room" && (
          <div
            className="room-panel"
            style={{
              position:"absolute", inset:"14px",
              border:"1.5px dashed rgba(255,255,255,0.22)",
              borderRadius:20,
              display:"flex", flexDirection:"column",
              padding:"0 14px 14px",
              gap:12,
            }}
          >
            {/* Header — only Hailey + room label */}
            <div style={{
              display:"flex", alignItems:"center",
              justifyContent:"space-between",
              padding:"12px 4px 10px",
              borderBottom:"1px solid rgba(255,255,255,0.07)",
            }}>
              <ProfileBubble profile={PROFILES[0]} />
              <div style={{
                background:"rgba(80,30,160,0.85)",
                border:"1px solid rgba(255,255,255,0.2)",
                borderRadius:20, padding:"4px 16px",
                color:"rgba(255,255,255,0.75)",
                fontSize:11, fontFamily:"monospace", whiteSpace:"nowrap",
              }}>
                Melody Room with @hailey.reyes is active
              </div>
            </div>

            <div style={{ display:"flex", gap:12, flex:1, minHeight:0 }}>
              <MusicPlayer
                song={QUEUE[currentIdx]}
                isPlaying={isPlaying}
                onToggle={() => setIsPlaying(p => !p)}
                onPrev={() => setCurrentIdx(i => (i - 1 + QUEUE.length) % QUEUE.length)}
                onNext={() => setCurrentIdx(i => (i + 1) % QUEUE.length)}
                progress={progress}
                onSeek={handleSeek}
              />
              <SongQueue
                queue={QUEUE}
                currentIdx={currentIdx}
                onSelect={(i) => setCurrentIdx(i)}
              />
              <Chat messages={messages} onSend={handleSend} />
            </div>

            {/* Carly — bottom */}
            <div style={{ display:"flex", justifyContent:"flex-end", paddingRight:4 }}>
              <ProfileBubble profile={PROFILES[1]} />
            </div>

            {/* leave */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <button
                onClick={handleLeave}
                style={{
                  background:"rgba(239,68,68,0.12)",
                  border:"1px solid rgba(239,68,68,0.38)",
                  color:"#fca5a5", borderRadius:10,
                  padding:"8px 26px", fontSize:12, fontWeight:600,
                  cursor:"pointer", transition:"background .2s",
                }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.28)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,0.12)"}
              >
                Leave Melody Room
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}