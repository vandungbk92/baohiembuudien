import ThongTinUngDung from './thongtinungdung.model';
import * as responseAction from '../../utils/responseAction';
import {filterRequest} from '../../utils/filterRequest';

export default {
    async create(req, res){
        try{
            const data = await ThongTinUngDung.create(req.body);
            return res.json(data);
        } catch (error) {
            responseAction.error(res, 500, error.errors);
        }
    },
    async findOne(req, res){
        try {
            console.log(req,'reqreqreq');
            let query = filterRequest(req.query, false)
            const data = await ThongTinUngDung.findOne(query);
            return res.json(data);
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    async delete(req, res){
        try {
            const id = req.params;
            const data = await ThongTinUngDung.findByIdAndDelete(id);
            if (!data) {
                responseAction.error(res, 404, '')
            }
            return res.json(data);
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    async update(req, res){
        try{
            const id = req.params;
            const data = await ThongTinUngDung.updateOne(req.body);
            if (!data) {
                responseAction.error(res, 404, '')
            }
            return res.json(data);
        } catch (err) {
            responseAction.error(res, 500, err.errors)
        }
    },
}
