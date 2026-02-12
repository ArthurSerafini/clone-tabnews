import database from "infra/database.js"

async function status(request, response) {
    const result = await database.query('SELECT 7+7;');
    console.log(result)
    response.status(200).json({"chave":"conteúdo"})
}

export default status;