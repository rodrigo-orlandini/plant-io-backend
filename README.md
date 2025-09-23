## 🌱 Plant.IO - Backend 

### Índices
- [Testes automatizados](#testes-automatizados)
- [SonarQube](#sonarqube)

---

### Testes automatizados

Para executar os testes automatizados no backend basta executar o seguinte comando:

```bash
npm run test
```

---

### SonarQube

Para obter o relatório do SonarQube sobre a qualidade do software, podemos simplesmente executar o comando abaixo:

```bash
npm run sonar
```

Este comando gera o relatório de cobertura de testes e o envia para análise do SonarQube. Se você deseja gerar apenas a cobertura de testes, você pode executar separadamente o comando abaixo:

```bash
npm run test:coverage
	```
