const db = require("../data/config")

function find() {
    return db("schemes")
}

function findById(id) {
    return db("schemes")
        .where({ id }).first()
}

function findSteps(id) {
    return db("steps")
        .join(
            "schemes",
            "schemes.id",
            "steps.scheme_id",
        )
        .select(
            "schemes.scheme_name",
            "steps.step_number",
            "steps.instructions",
        )
        .where({ scheme_id: id })
        .orderBy("steps.step_number")
}

function add(scheme) {
    return db("schemes")
        .insert(scheme, "id")
        .then((ids) => {
            return findById(ids[0])
        })
}

function update(changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes)
}

function remove(id) {
    if (!id) {
        return null
    }
    return db("schemes")
        .where("id", id)
        .del()
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
}