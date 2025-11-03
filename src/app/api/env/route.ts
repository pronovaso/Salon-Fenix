import {NextResponse} from 'next/server';

export const GET = async (request: Request) => {
    const {searchParams} = new URL(request.url);
    const envParams = searchParams.getAll('env');

    let env: Record<string, string | undefined> = {};
    if (envParams.length > 0) {
        envParams.forEach((key) => {
            env[key] = process.env[key];
        });
    } else {
        // Pokud není zadán žádný parametr, vrať všechny proměnné
        env = {...process.env};
    }

    return NextResponse.json({env});
};
