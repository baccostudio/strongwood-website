import type { ProjectImage } from "./media";

export interface ProjectCarouselControlsUi {
  prevAriaLabel: string;
  nextAriaLabel: string;
  imageLoadingAriaLabel: string;
  icon: ProjectImage;
}

export interface ProjectNextProjectUi {
  ariaLabelPrefix: string;
  icon: ProjectImage;
}

export interface ProjectDetailUi {
  carouselControls: ProjectCarouselControlsUi;
  nextProject: ProjectNextProjectUi;
  metadata: {
    descriptionTemplate: string;
  };
}
