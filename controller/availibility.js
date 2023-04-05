const models = require('../models');
const Availibility = models.Availibility;
const Availibility_Slot = models.Availibility_Slot;
const moment = require('moment');
const { Op } = require('sequelize');


exports.Availibility = async (req, res) => {
    try {
        const userid = req.userid;

        if (!userid) {
            res.status(400).json({ msg: "please login for access this permission" })
            return;
        }

        const { date, slot_time_to, slot_time_from, session_length, break_bw_session } = req.body;

        const avilabdata = await Availibility.create({
            date: date,
            slot_time_to: slot_time_to,
            slot_time_from: slot_time_from,
            session_length: session_length,
            break_bw_session: break_bw_session,
        });
        console.log("frgf tgrtgrtg rgr",avilabdata.id)



        let startTime = moment(avilabdata.slot_time_from, "HH:mm:ss");
        

        let endTime = moment(startTime, "HH:mm:ss").add(avilabdata.session_length, "minutes");


        const slots_time_to = moment(avilabdata.slot_time_to, "HH:mm:ss");


        while (endTime <= slots_time_to) {
          
            await Availibility_Slot.create({
                user_id: userid,
                slot_start: startTime.format("hh:mm a"),
                slot_end: endTime.format("hh:mm a"),
                availbilty_id: avilabdata.id
            })
            

            startTime = endTime.add(avilabdata.break_bw_session, "minutes");

            endTime = moment(startTime, "HH:mm:ss").add(avilabdata.session_length, "minutes");

            if (endTime > slots_time_to) {
                break;
            }
        }

        res.status(200).json({ status: "ok", msg: "Inserted"});

    } catch (e) {
        console.log(e);
    }
}



exports.listSlots = async (req,res)=>{
    try {
        const userid = req.userid;
        const date = req.body.date;
        
        var data ;
        if(date!=undefined){
            data = await Availibility.findAll({
                where: {
                    date: date
                },
                include: [
                  {
                    model: Availibility_Slot,
                    attributes: ["slot_start", "slot_end"],
                    where:{
                        user_id:userid
                    }
                  },
                ],
              });
        }

        data = await Availibility_Slot.findAll({
            where: {
                user_id: userid,
            },
            include: [
              {
                model: Availibility
              },
            ],
          });

        res.status(200).json({status:"ok",msg:"Avilable slots are ",data:data});
    } catch (e) {
        console.log(e);
    }
}





       
