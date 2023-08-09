import prisma from "./db";

export default async function fetchGroupedScores() {
    try {
        const allScores = await prisma.scores.findMany({
            orderBy: [
                {
                    version: "desc"
                },
                {
                    score: "desc"
                }
            ]
        })
        let versions: string[] = []
        allScores.forEach(e => {
            if(!versions.includes(e.version)) {
                versions.push(e.version)
            }
        })
        return { allScores, versions };
    } catch (e: any) {
        console.log(e)
        return { allScores: [], scores: [] }
    }
}