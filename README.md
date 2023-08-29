# Sistema Gerenciador de Cadastro de Alunos e Professores

Esta é uma API REST cujo objetivo é permitir o gerenciamento de cadastro de alunos, professores e salas de aula de uma escola.

A aplicação está contida na pasta **src** e dentro dela temos as pastas:

**config** - onde estão contidos os middlewares;

**controllers** - onde estão contidos os arquivos de controle da aplicação.

**database** - onde estão contidos os bancos de dados do projeto.

**routes** - onde estão contidos os arquivos das rotras.

**utils** - onde estão contidas funções utilitárias.

##### Estrutura das paginas
![1](https://github.com/Johashh/cadastro-alunos/assets/103287886/b6fb1adc-d8f3-40ec-97e3-471ed07d9fc6)

## Instalação

Instale o projeto com npm

```bash
  npm install
```

## Documentação da API

#### Cadastra um aluno

```http
  POST /api/student
```

| Parâmetro  | Tipo     | Descrição                                         |
| :--------- | :------- | :------------------------------------------------ |
| `name`     | `string` | **Obrigatório**. O nome do aluno à cadastrar.     |
| `email`    | `string` | **Obrigatório**. O email do aluno à cadastrar.    |
| `birthday` | `string` | **Obrigatório**. O birthday do aluno à cadastrar. |

#### addStudent

Lê os três parâmetros no body da requisição e checa se todos foram informados. Em seguida verifica no banco de dados **students.json** se já existe um aluno cadastrado com o nome ou email informados. Em caso negativo, a função cria um objeto **student** e adiciona uma matrícula (**registration**) do tipo number ao mesmo e o adiciona no respectivo banco.

##### Exemplo do Input:

![exemplo-do-input-addStudent](https://github.com/Johashh/cadastro-alunos/assets/103287886/5c8ec59b-c8fe-4885-ba0a-f09ab19a584a)

#### Atualiza os dados de um aluno

```http
  PATCH /api/student/:registration
```

| Parâmetro      | Tipo     | Descrição                                                |
| :------------- | :------- | :------------------------------------------------------- |
| `registration` | `number` | **Obrigatório**. A matrícula do aluno à atualizar.       |
| `name`         | `string` | **Opcional**. O nome do aluno à atualizar.               |
| `email`        | `string` | **Opcional**. O email do aluno à atualizar.              |
| `birthday`     | `string` | **Opcional**. A data de nascimento do aluno à atualizar. |

#### updateStudentProfile

Lê os três parâmetros no body da requisição, referentes aos dados à atualizar, e o parâmetro passado na rota, referente à matrícula do aluno à atualizar. Checa quais foram informados e, em seguida, verifica no banco de dados **students.json** se já existe um aluno cadastrado com o nome ou email informados, caso estes tenham sido transmitidos. Em caso negativo, a função atualiza as propriedades do objeto e salva as alterações no respectivo banco.
OBS: A função mantém as propriedades originais do objeto **student** caso o respectivo parâmetro esteja nulo.

#### Exclui os dados de um aluno

```http
  DELETE /api/student/:registration
```

| Parâmetro      | Tipo     | Descrição                                        |
| :------------- | :------- | :----------------------------------------------- |
| `registration` | `number` | **Obrigatório**. A matrícula do aluno à deletar. |

#### deleteStudent

Lê o parâmetro passado na rota, referente à matrícula do aluno à deletar, fazendo as devidas checagens e, em seguida, verifica no banco de dados **students.json** se existe um aluno cadastrado com a matrícula informada. Em caso positivo, a função deleta o objeto **student** com aquela matrícula do respectivo banco.

#### Retorna os dados do aluno

```http
  GET /api/students/:registration
```

| Parâmetro      | Tipo     | Descrição                                                         |
| :------------- | :------- | :---------------------------------------------------------------- |
| `registration` | `number` | **Obrigatório**. A matrícula referente ao aluno à ser consultado. |

#### getStudent

Lê o parâmetro passado na rota, referente à matrícula do aluno à consultar, fazendo as devidas checagens e, em seguida, verifica no banco de dados **students.json** se existe um aluno cadastrado com a matrícula informada. Em caso positivo, a função retorna o objeto **student** com aquela matrícula.

##### Exemplo de Output:

![exemplo-de-aluno](https://github.com/Johashh/cadastro-alunos/assets/103287886/b505e90e-7ac2-4d73-a88c-6c7a271cdf3d)

#### Cadastra um professor

```http
  POST /api/teacher
```

| Parâmetro  | Tipo     | Descrição                                                       |
| :--------- | :------- | :-------------------------------------------------------------- |
| `name`     | `string` | **Obrigatório**. O nome do professor à cadastrar.               |
| `email`    | `string` | **Obrigatório**. O email do professor à cadastrar.              |
| `birthday` | `string` | **Obrigatório**. A data de nascimento do professor à cadastrar. |

#### addTeacher

Lê os três parâmetros no body da requisição e checa se todos foram informados. Em seguida verifica no banco de dados **teachers.json** se já existe um professor cadastrado com o nome ou email informados. Em caso negativo, a função cria um objeto **teacher** e adiciona uma matrícula (**registration**) do tipo number ao mesmo e o adiciona no respectivo banco.

##### Exemplo de Input:

![exemplo-do-input-addTeacher](https://github.com/Johashh/cadastro-alunos/assets/103287886/af38f005-cb12-4246-882a-b61911a78203)

#### Atualiza os dados de um professor

```http
  PATCH /api/teacher/:registration
```

| Parâmetro      | Tipo     | Descrição                                                    |
| :------------- | :------- | :----------------------------------------------------------- |
| `registration` | `number` | **Obrigatório**. A matrícula do professor à atualizar.       |
| `name`         | `string` | **Opcional**. O nome do professor à atualizar.               |
| `email`        | `string` | **Opcional**. O email do professor à atualizar.              |
| `birthday`     | `string` | **Opcional**. A data de nascimento do professor à atualizar. |

#### updateTeacherProfile

Lê os três parâmetros no body da requisição, referentes aos dados à atualizar, e o parâmetro passado na rota, referente à matrícula do professor à atualizar. Checa quais foram informados e, em seguida, verifica no banco de dados **teachers.json** se já existe um professor cadastrado com o nome ou email informados, caso estes tenham sido transmitidos. Em caso negativo, a função atualiza as propriedades do objeto e salva as alterações no respectivo banco.
OBS: A função mantém as propriedades originais do objeto **teacher** caso o respectivo parâmetro esteja nulo.

#### Exclui os dados de um professor

```http
  DELETE /api/teacher/:registration
```

| Parâmetro      | Tipo     | Descrição                                            |
| :------------- | :------- | :--------------------------------------------------- |
| `registration` | `number` | **Obrigatório**. A matrícula do professor à deletar. |

#### deleteTeacher

Lê o parâmetro passado na rota, referente à matrícula do professor à deletar, fazendo as devidas checagens e, em seguida, verifica no banco de dados **teachers.json** se existe um professor cadastrado com a matrícula informada. Em caso positivo, a função deleta o objeto **teacher** com aquela matrícula do respectivo banco.

#### Retorna os dados do professor

```http
  GET /api/teacher/:registration
```

| Parâmetro      | Tipo     | Descrição                                                             |
| :------------- | :------- | :-------------------------------------------------------------------- |
| `registration` | `number` | **Obrigatório**. A matrícula referente ao professor à ser consultado. |

#### getTeacher

Lê o parâmetro passado na rota, referente à matrícula do professor à consultar, fazendo as devidas checagens e, em seguida, verifica no banco de dados **teachers.json** se existe um professor cadastrado com a matrícula informada. Em caso positivo, a função retorna o objeto **teacher** com aquela matrícula.

##### Exemplo de Output:

![exemplo-de-professor](https://github.com/Johashh/cadastro-alunos/assets/103287886/c8d294df-e000-4919-bc12-1b324cb23db9)

#### createClassRoom

Lê os parâmetros no body da requisição e checa se todos foram informados. Após a checagem um objeto **classroom** é criado e um número do tipo number é atribuido a ele, além de um array (**students**) vazio e um objeto **teacher** correspondente à matrícula informada. Por fim o classroom é adicionado ao banco **clasrooms.json**

#### Cria uma sala

```http
  POST /api/classroom
```

| Parâmetro             | Tipo     | Descrição                                                          |
| :-------------------- | :------- | :----------------------------------------------------------------- |
| `capacity`            | `number` | **Obrigatório**. A capacidade que a sala terá.                     |
| `teacherRegistration` | `number` | **Obrigatório**. A matrícula do professor que deseja criar a sala. |

#### createClassroom

Lê os parâmetros no body da requisição e checa se todos foram informados. Após a checagem um objeto **classroom** é criado e um número do tipo number é atribuido a ele, além de um array (**students**) vazio e um objeto **teacher** correspondente à matrícula informada. Por fim o classroom é adicionado ao banco **clasrooms.json**.

##### Exemplo de Input:

![exemplo-do-input-clasroom](https://github.com/Johashh/cadastro-alunos/assets/103287886/3f47cae1-213b-4675-9bee-db2567da77fd)

#### Atualiza os dados de uma sala

```http
  PATCH /api/classroom/:number
```

| Parâmetro  | Tipo     | Descrição                                      |
| :--------- | :------- | :--------------------------------------------- |
| `capacity` | `number` | **Obrigatório**. A nova capacidade da sala.    |
| `number`   | `number` | **Obrigatório**. O número da sala a atualizar. |

#### updateClassroomData

Lê o parâmetro da rota e do body da requisição e faz as checagens. Neste caso, apenas a capcidade pode ser alterada. Apoós feitas as devidadas verificações, a função altera a propriedade capacity no objeto **classroom** correspondente ao número informado e então salva a alteração no respectivo banco.

#### Exclui os dados de uma sala

```http
  DELETE /api/classroom/:number
```

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `number`  | `number` | **Obrigatório**. O número da sala à deletar. |

#### deleteClassroom

Lê o parâmetro passado na rota, referente áo número da sala à deletar, fazendo as devidas checagens e, em seguida, verifica no banco de dados **teachers.json** se existe uma sala cadastrada com o número informado. Em caso positivo, a função deleta o objeto **classroom** com aquele número do respectivo banco.

#### Retorna os dados de uma sala

```http
  GET /api/classroom/:number
```

| Parâmetro | Tipo     | Descrição                                          |
| :-------- | :------- | :------------------------------------------------- |
| `number`  | `number` | **Obrigatório**. O númeroda sala à ser consultada. |

#### getClassroom

Lê o parâmetro passado na rota, referente a sala à consultar, fazendo as devidas checagens e, em seguida, verifica no banco de dados **clasrooms.json** se existe uma sala cadastrada com número informado. Em caso positivo, a função retorna o objeto **clasroom** com aquele número.

##### Exemplo de Output:

![exemplo-de-clasroom](https://github.com/Johashh/cadastro-alunos/assets/103287886/1cafb303-72ae-42a2-91a6-9ab0b3be9be6)

#### Aloca um aluno em uma sala

```http
  POST /api/resource
```

| Parâmetro             | Tipo     | Descrição                                                             |
| :-------------------- | :------- | :-------------------------------------------------------------------- |
| `teacherRegistration` | `number` | **Obrigatório**. A matrícula do professor que deseja alocar um aluno. |
| `studentRegistration` | `number` | **Obrigatório**. A matrícula do aluno a ser alocado.                  |
| `classroomNumber`     | `number` | **Obrigatório**. O número da sala em que o aluno será alocado.        |

#### addStudentToClassroom

Lê os parâmetros no body da requisição e checa se todos foram informados. O professor em questão deve ser o mesmo vinculado à sala na qual o aluno será alocado. Após todas as checagens o objeto **student**, referente à matrícula do aluno fornecida, é adicionado no array **students** da referida sala e então a função salva a operação no banco **classrooms.json**.

##### Exemplo de Input:

![exemplo-do-input-addStudentToClasroom](https://github.com/Johashh/cadastro-alunos/assets/103287886/7d406dbb-3d38-46fd-8799-c95c7073f003)

#### Deleta um aluno em uma sala

```http
  DELETE /api/resource
```

| Parâmetro             | Tipo     | Descrição                                                       |
| :-------------------- | :------- | :-------------------------------------------------------------- |
| `studentRegistration` | `number` | **Obrigatório**. A matrícula do aluno a ser deletado.           |
| `classroomNumber`     | `number` | **Obrigatório**. O número da sala em que o aluno será removido. |

#### deleteStudenFromClassroom

Lê os parâmetros no body da requisição e checa se todos foram informados. Após as checagens, se o aluno pertencer a sala requisitada, a função o remove do objeto **students** da mesma e salva a operação no banco **clasrrooms.json**.

#### Consulta os alunos de uma sala

```http
  GET /api/resource
```

| Parâmetro         | Tipo     | Descrição                                           |
| :---------------- | :------- | :-------------------------------------------------- |
| `classroomNumber` | `number` | **Obrigatório**. O número da sala a ser consultada. |

#### getStudentsFromClasroom

Lê o número da sala passado no body da requisição e verifica se foi informado. Após as checagens, se a sala informada existir no registro, a função retorna o array **students** contido nela.

##### Exemplo de Output:

![exemplo-de-alunos-de-uma-sala](https://github.com/Johashh/cadastro-alunos/assets/103287886/acfb07d9-e6df-4f3b-912d-4fbe341e413f)

#### Consulta as salas de uma aluno

```http
  GET /api/resource/:studentRegistration
```

| Parâmetro             | Tipo     | Descrição                                               |
| :-------------------- | :------- | :------------------------------------------------------ |
| `studentRegistration` | `number` | **Obrigatório**. A matrícula do aluno a ser consultado. |

#### getClassroomsOfStudent

Lê a matrícula do aluno passada na rota e verifica se foi informada. Após as checagens, se o aluno informado existir no registro, a função retorna o novo objeto que contém o nome do aluno, o número das salas e o respectivo professor de cada uma.

##### Exemplo de Output:

![exemplo-de-salas-de-um-aluno](https://github.com/Johashh/cadastro-alunos/assets/103287886/dd4566d7-2e06-48b3-930f-3af21c2dc657)
