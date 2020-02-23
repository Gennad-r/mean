module.exports = (res, err) => {
    res.status(500).json({
        sucsess: false,
        message: err.message ? err.message : err
    })
}