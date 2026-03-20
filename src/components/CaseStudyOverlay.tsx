import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import csrEvent1 from "@/assets/csr-event-1.jpg";
import csrEvent2 from "@/assets/csr-event-2.jpg";
import pw1 from "@/assets/personal-work-1.jpg";
import pw2 from "@/assets/personal-work-2.png";
import pw3 from "@/assets/personal-work-3.jpg";
import pw4 from "@/assets/personal-work-4.jpg";
import pw5 from "@/assets/personal-work-5.jpg";
import pw6 from "@/assets/personal-work-6.jpg";
import pw7 from "@/assets/personal-work-7.jpg";
import menth1 from "@/assets/mentholatum-1.png";
import menth2 from "@/assets/mentholatum-2.png";
import menth3 from "@/assets/mentholatum-3.png";
import menth4 from "@/assets/mentholatum-4.png";
import menth5 from "@/assets/mentholatum-5.png";
import mars1 from "@/assets/mars-1.png";
import mars2 from "@/assets/mars-2.jpg";
import mars3 from "@/assets/mars-3.png";
import csrForum1 from "@/assets/csr-forum-1.jpg";
import csrForum2 from "@/assets/csr-forum-2.jpg";
import csrForum3 from "@/assets/csr-forum-3.jpg";
import csrForum4 from "@/assets/csr-forum-4.jpg";
import ffalcon1 from "@/assets/ffalcon-1.jpg";
import ffalcon2 from "@/assets/ffalcon-2.jpg";
import ffalcon3 from "@/assets/ffalcon-3.jpg";
import marsEvt1 from "@/assets/mars-event-1.png";
import marsEvt2 from "@/assets/mars-event-2.png";
import marsEvt3 from "@/assets/mars-event-3.png";
import shortVideoCover1 from "../../image assets_added for codex refinement/shortvideo1.png";
import shortVideoCover2 from "../../image assets_added for codex refinement/shortvideo2.png";
import motionImage1 from "../../image assets_added for codex refinement/p1.jpg";
import motionImage2 from "../../image assets_added for codex refinement/p2.jpg";
import motionImage3 from "../../image assets_added for codex refinement/p3.jpg";
import motionImage4 from "../../image assets_added for codex refinement/p4.jpg";
import fandomVideoCover from "../../image assets_added for codex refinement/fandom video.png";
import dataImage1 from "../../image assets_added for codex refinement/d1.png";
import dataImage2 from "../../image assets_added for codex refinement/d2.png";

const bezier = [0.16, 1, 0.3, 1] as const;
type Lang = "en" | "zh-TW" | "zh-CN";

interface CaseStudyOverlayProps {
  title: string | null;
  onClose: () => void;
  currentLang: Lang;
}

interface OverlayImageCardProps {
  src: string;
  alt: string;
  className?: string;
  onOpen: (src: string, alt: string) => void;
}

const workDetails: Record<string, { color: string; role: string; descriptions: Record<Lang, string> }> = {
  "Graphic Design": {
    color: "hsl(var(--terracotta))",
    role: "Exploring designer",
    descriptions: {
      en: "Designing compelling visual collateral from event posters to presentation decks, maintaining a consistent brand identity to deliver clean and functional multimedia content.",
      "zh-CN": "负责从活动海报到演示文稿等核心视觉物料的设计。在保持品牌视觉形象高度统一的同时，以简洁、实用的多媒体内容赋能线下活动，精准传达品牌价值。",
      "zh-TW": "設計具吸引力的視覺宣傳品，由活動海報到演示文稿等，維持統一的品牌形象，以提供簡潔實用的多媒體內容。",
    },
  },
  "Campaign Planning": {
    color: "hsl(var(--sage))",
    role: "Campaign Strategist & Designer",
    descriptions: {
      en: "Leveraging market research and consumer insights to design integrated marketing campaigns, coordinating cross-channel strategies to elevate brand visibility and audience engagement.",
      "zh-CN": "基于市场调研与消费者洞察，策划并执行整合营销方案。统筹线上线下跨渠道战略，有效提升品牌曝光度与目标受众参与度。",
      "zh-TW": "善用市場調研及消費者洞察，策劃整合營銷活動，協調跨渠道策略，有效提升品牌知名度及受眾參與度。",
    },
  },
  "Video Editing": {
    color: "hsl(var(--slate))",
    role: "Video Editor & Motion Designer",
    descriptions: {
      en: "Scripting, curating, and editing dynamic short-form video content for social media platforms, focusing on engaging visual storytelling to capture continuous viewership and interaction.",
      "zh-CN": "负责社交媒体短视频的策划、脚本撰写及后期剪辑，专注于打造高互动率的视觉叙事内容。从抖音、视频号矩阵到企业活动主题片，我始终致力于用动态影像讲述更具感染力、真实可感的品牌故事。",
      "zh-TW": "為社交媒體平台編寫劇本、策劃及剪輯充滿活力的短片內容，專注於引人入勝的視覺敘事，以持續吸引觀看及互動。",
    },
  },
  "Data Analytics": {
    color: "hsl(var(--warm-black))",
    role: "Business Operation and Customer Analytics",
    descriptions: {
      en: "Process and analyze data by Excel, SQL and Python to uncover the dynamics of business operation and customer dynamics.",
      "zh-CN": "Process and analyze data by Excel, SQL and Python to uncover the dynamics of business operation and customer dynamics.",
      "zh-TW": "Process and analyze data by Excel, SQL and Python to uncover the dynamics of business operation and customer dynamics.",
    },
  },
  "Event Management": {
    color: "hsl(var(--dusty-rose))",
    role: "Project Manager & Coordinator",
    descriptions: {
      en: "Planning and executing events from end to end, managing logistics, vendors, and creative direction to deliver memorable experiences.",
      "zh-CN": "统筹活动的全流程策划与落地执行。全面管理创意方向（如物料设计与影片拍摄）、后勤调配及第三方供应商对接，为受众打造令人难忘的品牌体验。",
      "zh-TW": "策劃及統籌活動的全部流程，管理物流、供應商及創意方向，以提供難忘的體驗。",
    },
  },
};

const motionReelShortVideos = [
  {
    title: "Short Video 01",
    url: "https://v.douyin.com/g-4cEGd3K8c/",
    cover: shortVideoCover1,
  },
  {
    title: "Short Video 02",
    url: "https://v.douyin.com/ewnX0cG4xwE/",
    cover: shortVideoCover2,
  },
];

const motionReelImages = [motionImage1, motionImage2, motionImage3, motionImage4];
const dataAnalyticsImages = [dataImage1, dataImage2];
const fandomVideoUrl = "https://x.com/127bar_cn/status/1754109750063821255?s=46";

const OverlayImageCard: React.FC<OverlayImageCardProps> = ({
  src,
  alt,
  className = "flex-none w-[75%] aspect-[4/3]",
  onOpen,
}) => (
  <button
    type="button"
    onClick={() => onOpen(src, alt)}
    className={`${className} rounded-lg overflow-hidden border border-border bg-background/60 flex items-center justify-center`}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </button>
);

const CaseStudyOverlay: React.FC<CaseStudyOverlayProps> = ({ title, onClose, currentLang }) => {
  const details = title ? workDetails[title] : null;
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const localizedDescription = details ? details.descriptions[currentLang] : "";

  return (
    <AnimatePresence>
      {title && details && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ ease: bezier, duration: 0.5 }}
            className="fixed inset-x-0 bottom-0 top-12 md:top-auto md:right-0 md:left-auto md:w-2/3 md:min-w-[66.666667vw] md:h-full bg-card z-[60] overflow-y-auto shadow-2xl"
          >
            {/* Header bar */}
            <div className="h-2 w-full" style={{ background: details.color }} />

            <div className="p-8 md:p-10 space-y-8">
              <button
                onClick={onClose}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>

              <div>
                <span
                  className="inline-block text-[10px] tracking-label uppercase px-2.5 py-1 rounded-full mb-4"
                  style={{
                    background: `${details.color}15`,
                    color: details.color,
                  }}
                >
                  {details.role}
                </span>
                <h2 className="font-display text-3xl md:text-4xl tracking-display leading-tight">
                  {title}
                </h2>
              </div>

              {title !== "Data Analytics" && (
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  {localizedDescription}
                </p>
              )}

              {title === "Graphic Design" ? (
                <>
                  {/* Event Materials Design */}
                  <div className="space-y-3">
                    <h3 className="font-display text-lg tracking-display">Event Materials Design</h3>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-8 md:-mr-10">
                      {[csrEvent1, csrEvent2].map((src, i) => (
                        <OverlayImageCard key={src} src={src} alt={`Event material ${i + 1}`} onOpen={(imageSrc, imageAlt) => setSelectedImage({ src: imageSrc, alt: imageAlt })} />
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground font-body">
                      Source: 10th CSR Forum CUHK, 2026
                    </p>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Personal Works */}
                  <div className="space-y-3">
                    <h3 className="font-display text-lg tracking-display">Personal Works</h3>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-8 md:-mr-10">
                      {[pw1, pw2, pw3, pw7, pw4, pw5, pw6].map((src, i) => (
                        <OverlayImageCard key={src} src={src} alt={`Personal work ${i + 1}`} onOpen={(imageSrc, imageAlt) => setSelectedImage({ src: imageSrc, alt: imageAlt })} />
                      ))}
                    </div>
                  </div>
                </>
              ) : title === "Campaign Planning" ? (
                <>
                  {/* Module 1: Integrated Marketing Initiatives */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-display text-lg tracking-display">Integrated Marketing Initiatives</h3>
                      <p className="text-[11px] text-muted-foreground font-body mt-1">Mentholatum IMC Campaigns 2025</p>
                    </div>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-8 md:-mr-10">
                      {[menth1, menth2, menth3, menth4, menth5].map((src, i) => (
                        <OverlayImageCard key={src} src={src} alt={`Mentholatum IMC ${i + 1}`} onOpen={(imageSrc, imageAlt) => setSelectedImage({ src: imageSrc, alt: imageAlt })} />
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border my-2" />

                  {/* Module 2: Corporate Communication Initiatives */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-display text-lg tracking-display">Corporate Communication Initiatives</h3>
                      <p className="text-[11px] text-muted-foreground font-body mt-1">Mars China 35th Anniversary</p>
                    </div>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-8 md:-mr-10">
                      {[mars1, mars2, mars3].map((src, i) => (
                        <OverlayImageCard key={src} src={src} alt={`Mars China ${i + 1}`} onOpen={(imageSrc, imageAlt) => setSelectedImage({ src: imageSrc, alt: imageAlt })} />
                      ))}
                    </div>
                    <div className="flex gap-3 pt-1">
                      <a href="https://mp.weixin.qq.com/s/4zTESNhdQ1mpXNPSX6vqqg?scene=1" target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 font-body">Link 01 →</a>
                      <a href="https://mp.weixin.qq.com/s/b79HsEsDHpPStt2vvmqjYw?scene=1" target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 font-body">Link 02 →</a>
                    </div>
                  </div>
                </>
              ) : title === "Video Editing" ? (
                <>
                  {/* Section 1: Short Videos */}
                  <div className="space-y-4">
                    <h3 className="font-display text-lg tracking-display">Short Videos</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {motionReelShortVideos.map((video) => (
                        <div key={video.url} className="space-y-2">
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block aspect-[9/16] rounded-lg bg-muted border border-border overflow-hidden relative"
                          >
                            <img
                              src={video.cover}
                              alt={video.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                <div className="ml-1 w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent" />
                              </div>
                            </div>
                          </a>
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 font-body"
                          >
                            Open in Douyin →
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-8 md:-mr-10">
                      {motionReelImages.map((src, i) => (
                        <OverlayImageCard
                          key={src}
                          src={src}
                          alt={`Motion image ${i + 1}`}
                          className="flex-none w-[40%] aspect-square"
                          onOpen={(imageSrc, imageAlt) => setSelectedImage({ src: imageSrc, alt: imageAlt })}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Section 2: Fandom Videos */}
                  <div className="space-y-4">
                    <h3 className="font-display text-lg tracking-display">Fandom Videos</h3>
                    <div className="space-y-2">
                      <a
                        href={fandomVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block aspect-video rounded-lg bg-muted border border-border overflow-hidden relative"
                      >
                        <img
                          src={fandomVideoCover}
                          alt="Fandom video cover"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-lg">
                            <div className="ml-1 w-0 h-0 border-l-[18px] border-l-white border-y-[12px] border-y-transparent" />
                          </div>
                        </div>
                      </a>
                      <a
                        href={fandomVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 font-body"
                      >
                        Open on X →
                      </a>
                    </div>
                  </div>
                </>
              ) : title === "Data Analytics" ? (
                <div className="space-y-4">
                  <h3 className="font-display text-lg tracking-display">
                    Exploratory Data Analysis: Discount Effects on Sales across Key Regions
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed font-body font-light max-w-3xl">
                    A statistical evaluation examining the strong positive linear correlation between discounts and sales across four key regions, designed to generate strategic insights for localized sales targets and risk management.
                  </p>
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-8 md:-mr-10">
                    {dataAnalyticsImages.map((src, i) => (
                      <OverlayImageCard key={src} src={src} alt={`Data analytics visual ${i + 1}`} onOpen={(imageSrc, imageAlt) => setSelectedImage({ src: imageSrc, alt: imageAlt })} />
                    ))}
                  </div>
                </div>
              ) : title === "Event Management" ? (
                <>
                  {/* Module 1 */}
                  <div className="space-y-3">
                    <h3 className="font-display text-lg tracking-display">10th CSR Forum, CUHK, 2026</h3>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-8 md:-mr-10">
                      {[csrForum1, csrForum2, csrForum3, csrForum4].map((src, i) => (
                        <OverlayImageCard key={src} src={src} alt={`CSR Forum ${i + 1}`} onOpen={(imageSrc, imageAlt) => setSelectedImage({ src: imageSrc, alt: imageAlt })} />
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Module 2 */}
                  <div className="space-y-3">
                    <h3 className="font-display text-lg tracking-display">FFalcon's 8th Anniversary 2025</h3>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-8 md:-mr-10">
                      {[ffalcon1, ffalcon2, ffalcon3].map((src, i) => (
                        <OverlayImageCard key={src} src={src} alt={`FFalcon Anniversary ${i + 1}`} onOpen={(imageSrc, imageAlt) => setSelectedImage({ src: imageSrc, alt: imageAlt })} />
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Module 3 */}
                  <div className="space-y-3">
                    <h3 className="font-display text-lg tracking-display">Mars China Media Gathering in Guangzhou 2024</h3>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-8 md:-mr-10">
                      {[marsEvt1, marsEvt2, marsEvt3].map((src, i) => (
                        <OverlayImageCard key={src} src={src} alt={`Mars Media Gathering ${i + 1}`} onOpen={(imageSrc, imageAlt) => setSelectedImage({ src: imageSrc, alt: imageAlt })} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-[4/3] rounded-lg bg-muted border border-border flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground tracking-label uppercase">Image 01</span>
                  </div>
                  <div className="aspect-[4/3] rounded-lg bg-muted border border-border flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground tracking-label uppercase">Image 02</span>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
          <AnimatePresence>
            {selectedImage && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImage(null)}
                  className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[70]"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.25, ease: bezier }}
                  className="fixed inset-4 md:inset-10 z-[80] rounded-2xl border border-border bg-card shadow-2xl flex flex-col"
                >
                  <div className="flex justify-end p-3 md:p-4">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Close
                    </button>
                  </div>
                  <div className="flex-1 px-4 pb-4 md:px-6 md:pb-6 flex items-center justify-center min-h-0">
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyOverlay;
