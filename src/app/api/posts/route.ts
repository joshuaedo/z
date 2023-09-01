import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

export async function GET(req: Request) {
    const url = new URL(req.url)

    const session = await getAuthSession()

    let followedCommunitiesIds: string[] = []

    if (session) {
        const followedCommunities = await db.subscription.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                community: true,
            },
        })

        followedCommunitiesIds = followedCommunities.map(
            ({community}) => community.id
        )
    }

    try {
        const {limit, page, communityName} = z.object({
            limit: z.string(),
            page: z.string(),
            communityName: z.string().nullish().optional()
        }).parse({
            communityName: url.searchParams.get("communityName"),
            limit: url.searchParams.get("limit"),
            page: url.searchParams.get("page"),
        })

        let whereClause = {}
    } catch (error) {

    }
}