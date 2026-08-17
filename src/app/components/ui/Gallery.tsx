"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import JSZip from "jszip";

type GalleryImage = {
  src: string;
  alt: string;
  downloadName: string;
};

type GalleryProps = {
  images: GalleryImage[];
  zipName?: string;
};

export default function Gallery({
  images,
  zipName = "galerie-bilder.zip",
}: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  const toggleSelectMode = () => {
    setSelectMode((mode) => {
      if (mode) setSelected(new Set());
      return !mode;
    });
    setError(null);
  };

  const toggleSelect = (index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(images.map((_, i) => i)));
  const clearSelection = () => setSelected(new Set());

  const downloadSelected = async () => {
    if (selected.size === 0 || downloading) return;
    setDownloading(true);
    setError(null);
    try {
      const zip = new JSZip();
      const indices = [...selected].sort((a, b) => a - b);
      setProgress({ done: 0, total: indices.length });
      for (const index of indices) {
        const image = images[index];
        const response = await fetch(image.src);
        if (!response.ok) {
          throw new Error(`Bild ${index + 1} konnte nicht geladen werden.`);
        }
        zip.file(image.downloadName, await response.blob());
        setProgress((p) => ({ ...p, done: p.done + 1 }));
      }
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = zipName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setSelected(new Set());
      setSelectMode(false);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Die Bilder konnten nicht heruntergeladen werden."
      );
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowLeft") showPrev();
      else if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, showPrev, showNext]);

  useEffect(() => {
    if (!selectMode) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") toggleSelectMode();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectMode]);

  const active = activeIndex === null ? null : images[activeIndex];

  return (
    <>
      <div className="gallery-toolbar">
        <button
          type="button"
          className={`btn ghost${selectMode ? " is-active" : ""}`}
          onClick={toggleSelectMode}
          aria-pressed={selectMode}
        >
          {selectMode ? "Auswahlmodus beenden" : "Bilder auswählen"}
        </button>
        {selectMode && (
          <div className="gallery-toolbar-actions">
            <span className="gallery-toolbar-count" aria-live="polite">
              {selected.size} von {images.length} ausgewählt
            </span>
            <button type="button" className="btn ghost" onClick={selectAll}>
              Alle auswählen
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={clearSelection}
              disabled={selected.size === 0}
            >
              Auswahl leeren
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={downloadSelected}
              disabled={selected.size === 0 || downloading}
            >
              {downloading
                ? `Wird heruntergeladen… ${progress.done}/${progress.total}`
                : `${selected.size} ${
                    selected.size === 1 ? "Bild" : "Bilder"
                  } herunterladen`}
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="gallery-error" role="alert">
          {error}
        </p>
      )}

      <div className="gallery-grid">
        {images.map((image, index) => {
          const isSelected = selected.has(index);
          return (
            <button
              key={image.src}
              type="button"
              className={`gallery-item${
                selectMode ? " gallery-item--selectable" : ""
              }${isSelected ? " gallery-item--selected" : ""}`}
              onClick={() =>
                selectMode ? toggleSelect(index) : setActiveIndex(index)
              }
              aria-pressed={selectMode ? isSelected : undefined}
              aria-label={
                selectMode
                  ? `Bild ${index + 1} ${isSelected ? "auswahl aufheben" : "auswählen"}`
                  : `Bild ${index + 1} von ${images.length} vergrößern`
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
                loading="lazy"
              />
              {selectMode && (
                <span className="gallery-item-check" aria-hidden="true">
                  {isSelected ? "✓" : ""}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {active && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={close}
            aria-label="Galerie schließen"
          >
            ×
          </button>
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-nav--prev"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            aria-label="Vorheriges Bild"
          >
            ‹
          </button>
          <img
            className="gallery-lightbox-image"
            src={active.src}
            alt={active.alt}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-nav--next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Nächstes Bild"
          >
            ›
          </button>
          <div
            className="gallery-lightbox-footer"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="gallery-lightbox-counter">
              {(activeIndex ?? 0) + 1} / {images.length}
            </span>
            <a
              className="btn primary"
              href={active.src}
              download={active.downloadName}
            >
              Bild herunterladen
            </a>
          </div>
        </div>
      )}
    </>
  );
}
