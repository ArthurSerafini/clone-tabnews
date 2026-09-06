import database from "infra/database.js"

async function status(request, response) {
    const updatedAt = new Date().toISOString();
    const dbResponseVersion = await database.query("SHOW server_version");
    const dbResponseMaxConections = await database.query("SHOW max_connections");

    var databaseName = process.env.POSTGRES_DATABASE
    const dbResponseOpenedConnections = await database.query({
        text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
        values: [databaseName]
    });

    response.status(200).json({
        updated_at: updatedAt,
        server_version: dbResponseVersion.rows[0].server_version,
        max_connections: dbResponseMaxConections.rows[0].max_connections,
        opened_connections: dbResponseOpenedConnections.rows[0].count
    });
}

export default status;