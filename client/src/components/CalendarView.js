import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Badge} from 'reactstrap';
import categoryService from '../services/category';
import Swal from "sweetalert2";
import {swalDeleteForm, swalError, swalInfo, swalSuccess} from "../utils/swal";

/*import NoCategorySelected from "./NoCategorySelected";
import taskService from '../services/task';*/

function CalendarView(props) {

   /*  const [start, setStart] = useState(Date.now());
    const [end, setEnd] = useState(Date.now()); */
    const [selectedDay, setSelectedDay] = useState()
    const [duration, setDuration] = useState('');

    useEffect(() => {

        var beginDate = moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('YYYY-MM-DD');
        var endDate = moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('YYYY-MM-DD');
        console.log('first day : '+ beginDate +  ' last day : ', endDate);

        categoryService.getDuration(props.selectedCategory._id, beginDate, endDate)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                Swal.close();
                var x = result.data.duration * 1000;
                var d = moment.duration(x, 'milliseconds');
                var hours = Math.floor(d.asHours());
                var mins = Math.floor(d.asMinutes()) - hours * 60;
                console.log(hours + " hours:" + mins + " mins:");
                const theDuration = hours + " h " + mins + " mn";

                //setTotalDuration(theDuration)
                setDuration(theDuration);
            });
       
    }, [props.selectedCategory]);

    moment.locale("en", {
        week: {
            dow: 1
        }
    })
    const localizer = momentLocalizer(moment);

    const handleSelect = ({ start, end }) => {
        //console.log('change select');
    }
    

    const onNavigate = (date, view) => {
        let start, end;
      
        if (view === 'month') {
          start = moment().startOf('month').format('YYYY/MM/DD');
          //console.log(start)
          end = moment().endOf('month').format('YYYY/MM/DD');
         } /*else if(view === 'week'){
            start = moment(date).startOf('week').startOf('day')
            end = moment(date).endOf('week').endOf('day')
        } */

        var beginDate = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('YYYY-MM-DD');
        var endDate = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('YYYY-MM-DD');
        //console.log('first day : '+ firstDay +  ' last day : ', lastDay);

        categoryService.getDuration(props.selectedCategory._id, beginDate, endDate)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                Swal.close();
                var x = result.data.duration * 1000;
                var d = moment.duration(x, 'milliseconds');
                var hours = Math.floor(d.asHours());
                var mins = Math.floor(d.asMinutes()) - hours * 60;
                console.log(hours + " hours:" + mins + " mins:");
                const theDuration = hours + " h " + mins + " mn";

                //setTotalDuration(theDuration)
                setDuration(theDuration);
            });
        //console.log('date :', moment(date, 'YYYY/MM/DD').format('YYYY-MM-DD'));
      
        return console.log({ start, end });
      }

    const handleSelectEvent = task => {
        console.log('see task selected : ', task)
        props.viewTaskDetails(task);
    }

    return (
        <div style={{height: '90vh'}}>
             <Badge color='warning' pill>
             Total duration : {duration}
      </Badge>
            <Calendar
                popup
                selectable
                localizer={localizer}
                events={props.tasks}
                onSelectSlot={handleSelect}
                onSelectEvent={handleSelectEvent}
                onNavigate={onNavigate}
            />
           
        </div>
    );
}

export default CalendarView;