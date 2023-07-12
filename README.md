## Задание:

[Front](https://github.com/Life1sOk/test-3205-front)
[Back](https://github.com/Life1sOk/test-3205-back)

> Напишите приложение с одной страницей, на котором находится форма с двумя полями
> email (обязательное) и number (опциональное)
> и кнопка submit при нажатии на submit запрос уходит на бек где нужно в JSON найти подходящих под поисковый запрос пользователей отобразить найденные данные на клиенте под формой.

### Условия:

- [x] На беке добавить задержку обработки запроса в 5 секунд (имитация долгой обработки ответа).
- [x] При повторном запросе с фронта, отменять прошлый запрос;
- [x] Обязательная валидация полей email и number. Можно сделать либо на фронте либо на беке, будьте готовы объяснить выбранный подход;
- [x] В поле number нужно добавить маску, чтобы номер отображался с дефисами каждые два знака. например 22-11-22, 83-03-47;

### Инструменты:

#### Front:

- React.js;
- TypeScript;
- Styled Components;

> Запуск: npm start; port: 3000

#### Back:

- Node.js;
- TyprScript;

> Запуск: npm run dev; port: 3001

## Описание реализации:

#### Front:

- При повторном запросе с фронта, отменять предыдущий запрос

> Реализовано с помощью Map и AbortController

```ruby
   // Определяем аборт-контролер для каждого сабмита
    const controller = new AbortController();

    // Функция аборт
    const abortHandler = function () {
      controller.abort();
    };

    // Если свойство "abort" существует в хашмапе - это значит, что сейчас идет предыдущий запрос на сервер. Достаем сохраненную функцию "abortHandler" (js: 32) и вызываем (js: 33), таким образом она отменяет предыдущий(свой) запрос. И так-как мы будет запускать еще один запрос, нам нужно перезаписать нашу функцию "abortHandler";
    // Если нет - записываем функцию "abortHandler";
    if (hash.has("abort")) {
      const prevRequestAbort = hash.get("abort");
      prevRequestAbort();
      hash.set("abort", abortHandler);
    } else {
      hash.set("abort", abortHandler);
    }
```

- Обязательная валидация полей email и number

> Email - Добавление типо 'email' автоматически проверяет на валидность ввода;

Number - метод replace() оставляет только числа

```ruby
    export const getOnlyNumbers = (text: string) => {
        return text.replace(/\D/g, "");
    };

```

- В поле number нужно добавить маску

> Реализовано с помощью match() и join() методов

```ruby
    export const modifyNumbers = (text: string) => {
    if (text.length > 2) {
        const matches = text.match(/.{1,2}/g);

        const result = matches?.join("-");
        return result;
    } else {
        return text;
    }
    };
```

#### Back:

- Найти подходящих под поисковый запрос пользователей (имитация ДБ) **[source](./src/app.ts)**

> Фильтрация существующих данных

```ruby
    const findedUser = usersData.filter((user) => {
      if (number > 0) {
        return user.email === email && user.number.toString().includes(number.toString());
      } else {
        return user.email === email;
      }
    });
```

- На беке добавить задержку обработки запроса в 5 секунд (имитация долгой обработки ответа).

> Реализация с помощью setTimeout();

```ruby
    setTimeout(() => response.status(200).json(findedUser), 5000);
```
