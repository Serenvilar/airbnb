import React, { useState, useEffect } from "react";

import "../estilos/Reserva.scss";
import showerIcon from "../assets/imgs/showerIcon.png";
import bedIcon from "../assets/imgs/bedIcon.png";
import wifiIcon from "../assets/imgs/wifiIcon.png";
import airIcon from "../assets/imgs/airIcon.png";
import { API_URL } from '../api/constants'

const Reserva = () => {
  const [quartos, setQuartos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarQuartos = async () => {
      try {
        const response = await fetch(`${API_URL}/quarto`);
        if (response.ok) {
          const data = await response.json();
          setQuartos(data);
        } else {
          setErro("Erro ao carregar quartos");
        }
      } catch (error) {
        console.error("Erro:", error);
        setErro("Erro ao carregar quartos");
      }
    };

    buscarQuartos();
  }, []);

  return (
    <div className="quarto_listagem">
      <h1>Faça sua reserva</h1>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <div className="container_quartos">
        {quartos.map((quarto) => (
          <div key={quarto.id} className="cartao_quarto">
            <img
              src={`${API_URL}/${quarto.imagem}`}
              alt="Quarto"
              className="imagem_quarto"
            />
            <div className="info_quarto">
              <h3>{quarto.nome}</h3>
              <p className="status">
                {quarto.status_quar === "Disponível" ? "Disponível" : "Indisponível"}
              </p>
              <div className="comodidades">
                <div>
                  <img src={showerIcon} alt="Banheiro Icon" />
                  {quarto.banheiro}
                </div>
                <div>
                  <img src={bedIcon} alt="Cama Icon" />
                  {quarto.tam_cama}
                </div>
                <div>
                  <img src={wifiIcon} alt="Wi-Fi Icon" />
                  {quarto.wifi ? "Wi-Fi gratuito" : "Sem Wi-Fi"}
                </div>
                <div>
                  <img src={airIcon} alt="Ar-condicionado Icon" />
                  {quarto.ar_condi}
                </div>
              </div>
              <div className="botao_avaliacao">
                <span>{quarto.classi_avaliacao}</span>
                <p>{quarto.num_avaliacao} avaliações</p>
              </div>
              <p className="preco">R$ {quarto.valor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reserva;
