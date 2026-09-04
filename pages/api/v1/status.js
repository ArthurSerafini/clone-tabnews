import database from "infra/database.js"

async function status(request, response) {
    
    var databaseName = process.env.POSTGRES_DATABASE
    const dbResponseOpenedConnections = await database.query({
        text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
        values: [databaseName]
    });
    console.log(dbResponseOpenedConnections.rows)

    response.status(200).json({
        opened_connections: dbResponseOpenedConnections.rows[0].count
    });
}

export default status;