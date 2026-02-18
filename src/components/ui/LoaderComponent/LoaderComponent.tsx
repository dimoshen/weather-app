"use client";

import { Loader2 } from "lucide-react";
import styles from "./LoaderComponent.module.scss";

interface Props {
  size?: number;
}

const LoaderComponent = ({ size = 40 }: Props) => {
  return (
    <div className={styles.loader}>
      <Loader2 size={size} className={styles.loader__icon} />
    </div>
  );
};

export default LoaderComponent;
