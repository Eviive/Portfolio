import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const GET = async (): Promise<ImageResponse> => {
    const logoData = await readFile(join(process.cwd(), "public", "logo.svg"), "utf-8");

    const logoSrc = `data:image/svg+xml,${encodeURIComponent(logoData)}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 50,
                    background: "#1a1a1a",
                    color: "#f2f2f2",
                    fontSize: 40,
                    fontFamily: "sans-serif"
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoSrc} alt="Albert Vaillon's logo" height={300} />
                Albert Vaillon&apos;s Portfolio
            </div>
        ),
        {
            width: 1200,
            height: 630
        }
    );
};
