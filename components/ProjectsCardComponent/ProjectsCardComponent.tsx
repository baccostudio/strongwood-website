import { ProjectInterface } from "@/types/ProjectsTypes";
import styles from "./ProjectsCardComponent.module.scss"
import Image from "next/image";
import Link from "next/link";

export default function ProjectsCardComponent({ projectData, index }: { projectData: ProjectInterface, index: number }) {
    return (
        <Link href={`/${projectData.urlSlug}/${projectData.projectSlug}`} className={`${styles["container-project-card"]}`}>
            <div className={`${styles["container-outer-image"]}`}>
                <Image
                    src={projectData.image.imgSrc}
                    alt={projectData.image.imgAlt}
                    fill
                    className={`${styles["container-inner-image"]}`}
                    style={{ objectPosition: projectData.image.objPosition }}
                    // sizes="(max-width: 768px) 90vw, 100vw"
                    // quality={100}
                    priority={index < 6 ? true : false}
                />
                <small className="loader">Cargando...</small>
            </div>
            <div className={styles["container-overlay-image"]} />
            <div className={styles["container-description-card"]}>
                <div className={styles["gap-description"]}>
                    <p className={styles["title-description"]}>{projectData.title}</p>
                    <p className={styles["subtitle-description"]}>{projectData.subtitle}</p>
                </div>
                <p className={styles["title-price"]}>{projectData.details.technicalInfo?.price_ars}</p>
            </div>
        </Link>
    )
}