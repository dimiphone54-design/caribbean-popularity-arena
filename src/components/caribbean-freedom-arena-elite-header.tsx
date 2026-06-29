import { CfaHeaderGlobeTrinidadJoinBeam } from "@/components/cfa-header-globe-trinidad-strobe-beam";
import { CfaHeaderRealWorldGlobe } from "@/components/cfa-header-real-world-globe";
import { CfaHeaderSlotCountriesFlipBackdrop } from "@/components/cfa-header-slot-countries-flip-backdrop";
import { CfaHeaderWorldCountriesSlideshow } from "@/components/cfa-header-world-countries-slideshow";

export function CaribbeanFreedomArenaEliteHeader() {
  return (
    <header className="cfa-elite-ai-header" aria-label="Caribbean Freedom Arena">
      <div className="cfa-elite-ai-header-frame">
        <CfaHeaderSlotCountriesFlipBackdrop />
        <CfaHeaderWorldCountriesSlideshow />
        <div className="cfa-elite-ai-header-firebar cfa-elite-ai-header-firebar-top" aria-hidden="true" />
        <div className="cfa-elite-ai-header-firebar cfa-elite-ai-header-firebar-bottom" aria-hidden="true" />
        <div className="cfa-elite-ai-header-scanlines" aria-hidden="true" />
        <div className="cfa-elite-ai-header-sweep" aria-hidden="true" />
        <div className="cfa-elite-ai-header-ember cfa-elite-ai-header-ember-left" aria-hidden="true" />
        <div className="cfa-elite-ai-header-ember cfa-elite-ai-header-ember-right" aria-hidden="true" />

        <div className="cfa-elite-ai-header-center-scrim" aria-hidden="true" />

        <div className="cfa-elite-ai-header-foreground">
          <div className="cfa-elite-ai-header-center-stack">
            <CfaHeaderRealWorldGlobe />

            <h1 className="cfa-elite-ai-header-title">
              <span className="cfa-elite-ai-header-title-glow" aria-hidden="true" />
              <span className="cfa-elite-ai-header-title-row">
                <span className="cfa-elite-ai-header-title-text" aria-label="Caribbean Freedom Arena">
                  <span className="cfa-elite-ai-header-title-part cfa-elite-ai-header-title-part--caribbean">CARIBBEAN</span>
                  <span className="cfa-elite-ai-header-title-part cfa-elite-ai-header-title-part--freedom">FREEDOM</span>
                  <span className="cfa-elite-ai-header-title-part cfa-elite-ai-header-title-part--arena">ARENA</span>
                  <span className="cfa-elite-ai-header-palm-wrap cfa-elite-ai-header-palm-wrap--title cfa-elite-ai-header-palm-wrap--title-end">
                    <span className="cfa-elite-ai-header-palm-tree" aria-hidden="true">
                      <img
                        src="/palm-tree.png?v=3"
                        alt=""
                        className="cfa-elite-ai-header-palm-img cfa-elite-ai-header-palm-img--title cfa-elite-ai-header-palm-img--trunk"
                      />
                      <span className="cfa-elite-ai-header-palm-leaves-rig">
                        <img
                          src="/palm-tree.png?v=3"
                          alt=""
                          className="cfa-elite-ai-header-palm-img cfa-elite-ai-header-palm-img--title cfa-elite-ai-header-palm-img--leaves"
                        />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </h1>

            <p className="cfa-elite-ai-header-sub">12 ISLANDS · 12 ARENAS · 12 HOURS</p>
          </div>
        </div>

        <CfaHeaderGlobeTrinidadJoinBeam />
      </div>
    </header>
  );
}
