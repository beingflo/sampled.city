import { createSignal } from "solid-js";

export const ManageTracks = () => {
  const [hovered, setHovered] = createSignal(false);

  const onDrop = (ev) => {
    ev.preventDefault();
    setHovered(false);

    [...(ev.dataTransfer?.items ?? [])].forEach((item, i) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        console.log(`file[${i}].name = ${file.name}`);
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

  return (
    <div class="w-screen h-screen p-4">
      <div
        class={`w-full h-full border ${
          hovered() ? "border-blue-400" : "border-black"
        } border-dashed`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragExit={onDragExit}
      />
    </div>
  );
};
