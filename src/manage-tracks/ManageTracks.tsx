import { For, createSignal } from "solid-js";
import { computeDuration, parseGPX } from "./utils";
import { useStore } from "../store";
import { Track } from "../types";

export const ManageTracks = () => {
  const [hovered, setHovered] = createSignal(false);
  const [state, { storeTrack }] = useStore();

  const onDrop = (ev) => {
    ev.preventDefault();
    setHovered(false);

    [...(ev.dataTransfer?.items ?? [])].forEach((item, i) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.readAsText(file);

        reader.addEventListener(
          "load",
          () => {
            const track = parseGPX(reader.result as string);
            storeTrack(track);
          },
          false
        );
      }
    });
  };

  const onDragOver = (ev) => {
    setHovered(true);
    ev.preventDefault();
  };
  const onDragExit = (ev) => {
    setHovered(false);
    ev.preventDefault();
  };

  const formatter = new Intl.DateTimeFormat("en-CH", {
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div class="w-screen h-screen p-4">
      <div
        class={`w-full h-full border ${
          hovered() ? "border-blue-400" : "border-black"
        } border-dashed`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragExit={onDragExit}
      >
        <h1 class="text-2xl font-bold uppercase p-4 pb-12">Manage tracks</h1>
        <ul class="px-4">
          <For each={state.tracks}>
            {(track: Track) => (
              <li class="flex flex-row gap-2">
                <p class="w-72">{track.name}</p>
                <p class="w-48">{formatter.format(new Date(track.time))}</p>
                <p>{computeDuration(track)}</p>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};
