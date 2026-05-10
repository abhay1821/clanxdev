import { GamificationBackgroundSvg } from "../components/icons/GamificationBackgroundSvg";
import { CreateRewardDialog } from "../components/gamification/CreateRewardDialog";
import { GAMIFICATION_HERO_CARDS } from "../data/gamificationHeroCards";
import { useAppDispatch } from "../hooks/redux";
import { openRewardDialog } from "../store/gamificationDialogSlice";

export function GamificationPage() {
  const dispatch = useAppDispatch();

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="relative overflow-hidden rounded-card max-w-[950px]">
        <div className="pointer-events-none absolute inset-0  w-full">
          <GamificationBackgroundSvg />
        </div>

        <div className="px-6 pb-8 pt-gamify-hero-top md:px-10">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <h2 className="font-sora text-gamify-hero-title font-semibold text-gamify-heading">
              Gamify your Campaign
            </h2>
            <p className="mt-2 font-dm text-gamify-hero-lead text-gray-600">
              Enable gamification to start crafting your custom reward system.
            </p>
            <button
              type="button"
              onClick={() => dispatch(openRewardDialog())}
              className="mt-6 rounded-[10px] bg-gamify-accent py-gamify-btn-pad px-10 font-dm text-gamify-hero-lead font-medium text-white shadow-btn transition hover:opacity-95"
            >
              Enable Gamification
            </button>
          </div>

          <div className="mt-10 flex flex-col gap-6 md:flex-row ">
            {GAMIFICATION_HERO_CARDS.map((card) => (
              <article
                key={card.title}
                className="relative  min-w-0 flex-1 overflow-hidden rounded-card border border-gamify-card-border bg-white px-4 py-5 shadow-card"
              >
                <img
                  src="/assets/backVector.svg"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="relative z-10 mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-[13.13px] bg-gamify-icon-badge">
                  <div className="flex h-[51.33px] w-[51.33px] items-center justify-center rounded-[8.75px] bg-white">
                    <img
                      src={card.icon}
                      alt={card.iconAlt}
                      className="h-[30.01px] w-[30.01px]"
                    />
                  </div>
                </div>
                <h3 className="relative z-10 mt-5 text-center font-sora text-base font-medium leading-[140%] text-gray-800">
                  {card.title}
                </h3>
                <p className="relative z-10 mt-2 text-center font-dm text-sm leading-[140%] text-gray-600">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <CreateRewardDialog />
    </section>
  );
}
