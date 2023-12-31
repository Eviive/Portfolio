import type { NextRequest } from "next/server";
import { ImageResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<ImageResponse> => {

    const logoUrl = new URL("/logo.svg", req.nextUrl.origin).toString();

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
