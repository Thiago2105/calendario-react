import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/DragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/DragAndDrop/styles.css";
import './components/Components-Calendario-css.css';

import eventosPadrao from "./components/eventosPadrao.jsx";
import EventModal from "./components/ModalEvent/EventModal.jsx";
import Adicionar from "./components/adicionar/Adicionar.jsx";
import CustomTollbar from "./components/CustomCalendar/CustomTollbar.jsx";
import FiltroAtividades from "./components/filtro/FiltroAtividades.jsx";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario() {
  const [eventos, setEventos] = useState(eventosPadrao);
  const [eventoSelecionado, SeteventoSelecionado] = useState(null);
  const [eventosFiltrados, SetEventosFiltrados] = useState(eventosPadrao);

  const eventStyle = (event) => ({
    style: {
      backgroudColor: event.color,
    },
  });

  const MoverEventos = (data) => {
    const { start, end } = data;
    const updatedEvents = eventos.map((event) => {
      if (event.id === data.event.id) {
        return {
          ...event,
          start: new Date(start),
          end: new Date(end),
        };
      }
      return event;
    });

    setEventos(updatedEvents);
  };

  const handleEventClick = (evento) => {
    SeteventoSelecionado(evento);
  };

  const handleEventClose = () => {
    SeteventoSelecionado(null);
  };

  const handleAdicionar = (novoEvento) => {
    setEventos([...eventos, { ...novoEvento, id: eventos.length + 1 }]);
  };

  const handleEventDelete = (eventId) => {
    const updatedEvents = eventos.filter((event) => event.id !== eventId);
    setEventos(updatedEvents);
    SeteventoSelecionado(null);
  };

  const handleEventUpdate = (updatedEvent) => {
    const updatedEvents = eventos.map((event) => {
      if (event.id === updatedEvent.id) {
        return updatedEvent;
      }
      return event;
    });
    setEventos(updatedEvents);
    SeteventoSelecionado(null);
  };

  const handleSelecionarAtividades = (atividadesSelecionadas) => {
    SetEventosFiltrados(atividadesSelecionadas);
  };

  return (
    <div className="tela">
      <div
        className="toolbar p-4"
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        <Adicionar onAdicionar={handleAdicionar} />
        <FiltroAtividades
          atividades={eventos}
          SelecionarAtividades={handleSelecionarAtividades}
        />
      </div>

      <div className="calendario">
        <DragAndDropCalendar
          defaulDate={moment().toDate()}
          defaulview="month"
          events={eventosFiltrados}
          localizer={localizer}
          resizable
          onEventDrop={MoverEventos}
          onEventResize={MoverEventos}
          onSelectEvent={handleEventClick}
          eventPropGetter={eventStyle}
          components={{
            toolbar: CustomTollbar,
          }}
          className="calendar"
        />
      </div>
      {eventoSelecionado && (
        <EventModal
          evento={eventoSelecionado}
          onclose={handleEventClose}
          onDelete={handleEventDelete}
          onUpdate={handleEventUpdate}
        />
      )}
    </div>
  );
}

export default Calendario;
