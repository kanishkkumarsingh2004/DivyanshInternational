interface Labels {
  accessibility: {
    skipLinkText: string;
    skipLinkTarget: string;
  };
}

interface SkipLinkProps {
  labels?: Labels;
}

export default function SkipLink({ labels }: SkipLinkProps) {
  return (
    <a
      href={labels?.accessibility?.skipLinkTarget}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-deep-brown)] focus:text-white focus:rounded focus:outline-2 focus:outline-white"
    >
      {labels?.accessibility?.skipLinkText}
    </a>
  );
}
