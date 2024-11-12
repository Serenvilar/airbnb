import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/AddQuarto.scss";
import { API_URL } from '../api/constants'

function AddQuarto() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    banheiro: "Banheiroprivado",
    cama: "",
    wifi: "wifi",
    arcondicionado: "arcondicionado",
    avaliacao: 0,
    numero: 0,
    valor: 0,
    status: "Disponível",
    imagem: null,
  });

  const handleMudar = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleNumero = (e) => {
    const { name, value } = e.target;

    // tirar qualquer caractere não numerico
    const valorNumerico = value.replace(/\D/g, "");

    // formatar o numero com virgulas
    const valorformatado = valorNumerico.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setForm((prevForm) => ({
      ...prevForm,
      [name]: valorformatado,
    }));
  };

  const handleImagem = (e) => {
    setForm((prevForm) => ({ ...prevForm, imagem: e.target.files[0] }));
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    try {
      // verificar se a imagem é fornecida
      if (!form.imagem) {
        throw new Error("Imagem do quarto é obrigatória");
      }

      const response = await fetch(`${API_URL}/quarto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: form.nome,
          banheiro: form.banheiro,
          tamCama: form.cama,
          wifi: form.wifi,
          ar_condi: form.arcondicionado,
          classiAvaliacao: form.avaliacao,
          numAvaliacao: form.numero.replace(/,/g, ""), // tirar as virgulas antes de enviar para o backend
          status: form.status,
          valor: form.valor,
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar o quarto");
      const result = await response.json();

      // fazer o upload da imagem se for fornecida
      const formData = new FormData();
      formData.append("imagem", form.imagem);
      const imageResponse = await fetch(
        `${API_URL}/quarto/${result.id}/imagem`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!imageResponse.ok) throw new Error("Erro ao salvar a imagem");

      alert("Quarto adicionado com sucesso!");
      navigate("/quartos");
    } catch (error) {
      console.error("Erro ao salvar o quarto:", error);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="addicionar_container">
      <h1>Adicionar Quarto</h1>
      <form onSubmit={handleEnviar} className="add_quarto_form">
        <label>
          Imagem:
          <input type="file" name="imagem" onChange={handleImagem} />
        </label>

        <label>
          Banheiro:
          <select
            name="banheiro"
            value={form.banheiro}
            onChange={handleMudar}
            required
          >
            <option value="">Selecionar opção</option>
            <option value="Banheiro privado">Banheiro privado</option>
            <option value="Banheiro compartilhado">
              Banheiro compartilhado
            </option>
          </select>
        </label>

        <label>
          Nome do quarto:
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleMudar}
            required
          />
        </label>

        <label>
          WiFi:
          <select name="wifi" value={form.wifi} onChange={handleMudar} required>
            <option value="">Selecionar opção</option>
            <option value="Wifi">Wifi</option>
            <option value="sem Wifi">sem Wifi</option>
          </select>
        </label>

        <label>
          Tamanho da cama:
          <input
            type="text"
            name="cama"
            value={form.cama}
            onChange={handleMudar}
            required
          />
        </label>

        <label>
          Ar condicionado:
          <select
            name="arcondicionado"
            value={form.arcondicionado}
            onChange={handleMudar}
            required
          >
            <option value="">Selecionar opção</option>
            <option value="Ar-condicionado">Ar-condicionado</option>
            <option value="sem Ar-condicionado">sem Ar-condicionado</option>
          </select>
        </label>

        <label>
          Classificação de avaliação:
          <input
            type="number"
            name="avaliacao"
            value={form.avaliacao}
            onChange={handleMudar}
            required
          />
        </label>

        <label>
          Status de disponibilidade:
          <input
            type="text"
            name="status"
            value={form.status}
            onChange={handleMudar}
            disabled
          />
        </label>

        <label>
          Número de Avaliações:
          <input
            type="text"
            name="numero"
            value={form.numero}
            onChange={handleNumero}
            required
          />
        </label>

        <label>
          Valor:
          <input
            type="number"
            name="valor"
            value={form.valor}
            onChange={handleMudar}
            required
          />
        </label>

        <button type="submit" className="add_form_botao full-width">
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default AddQuarto;
