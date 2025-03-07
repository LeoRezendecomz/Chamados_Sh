/*
  # Create Chamados_SH table

  1. New Tables
    - `Chamados_SH`
      - `id` (bigint, primary key)
      - `chamado_facil` (text)
      - `chamado_sd` (text)
      - `titulo` (text)
      - `data_abertura` (text)
      - `cumpriu_sla` (text)
      - `pendencia_retorno` (text)
      - `usuario_resp` (text)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `Chamados_SH` table
    - Add policies for authenticated users to perform CRUD operations
*/

CREATE TABLE IF NOT EXISTS "Chamados_SH" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  chamado_facil text NOT NULL,
  chamado_sd text NOT NULL,
  titulo text NOT NULL,
  data_abertura text NOT NULL,
  cumpriu_sla text NOT NULL,
  pendencia_retorno text NOT NULL,
  usuario_resp text NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE "Chamados_SH" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON "Chamados_SH"
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON "Chamados_SH"
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON "Chamados_SH"
  FOR UPDATE
  TO authenticated
  USING (true);