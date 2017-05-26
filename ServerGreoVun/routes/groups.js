router.get('/:id', (req, res, next) => {
    new User().where(function () {
        this.where('id', req.params.id)
    }).fetchAll().then((data) =>
        res.json(data)
        );
});
