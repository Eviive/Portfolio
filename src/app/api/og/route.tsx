import { ImageResponse } from "next/og";

export const GET = async (): Promise<ImageResponse> => {

    const logoUrl = new URL("/logo.svg", process.env.NEXT_PUBLIC_BASE_URL).toString();

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
                <img
                    src={logoUrl}
                    alt="Albert Vaillon's logo"
                    height={300}
                />
                Albert Vaillon&apos;s Portfolio
            </div>
        ),
        {
            width: 1200,
            height: 630
        },
    );
};
