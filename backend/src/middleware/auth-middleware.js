// Middleware para verificar se o usuário está autenticado
exports.verificarAutenticacao = (req, res, next) => {
    if (req.session && req.session.usuarioLogado) {
        // Usuário está autenticado
        return next();
    } else {
        // Usuário não está autenticado
        return res.status(401).json({ 
            message: "Acesso negado. Você precisa estar logado para acessar este recurso." 
        });
    }
};

// Middleware para verificar se o usuário é admin
exports.verificarAdmin = (req, res, next) => {
    if (req.session && req.session.usuarioLogado) {
        if (req.session.usuarioLogado.role === 'admin') {
            // Usuário é admin
            return next();
        } else {
            // Usuário autenticado mas não é admin
            return res.status(403).json({ 
                message: "Acesso negado. Você precisa ser administrador para acessar este recurso." 
            });
        }
    } else {
        // Usuário não está autenticado
        return res.status(401).json({ 
            message: "Acesso negado. Você precisa estar logado para acessar este recurso." 
        });
    }
};

// Middleware para verificar se o usuário é dono do recurso ou admin
exports.verificarDonoOuAdmin = (req, res, next) => {
    if (req.session && req.session.usuarioLogado) {
        const usuarioId = req.session.usuarioLogado.id;
        const role = req.session.usuarioLogado.role;
        
        // Se for admin, pode acessar qualquer recurso
        if (role === 'admin') {
            return next();
        }
        
        // Se for o dono do recurso (compara com ID do parâmetro da rota)
        const recursoId = parseInt(req.params.id) || parseInt(req.params.userId);
        if (usuarioId === recursoId) {
            return next();
        }
        
        // Não é admin nem dono
        return res.status(403).json({ 
            message: "Acesso negado. Você só pode acessar seus próprios recursos." 
        });
    } else {
        // Usuário não está autenticado
        return res.status(401).json({ 
            message: "Acesso negado. Você precisa estar logado para acessar este recurso." 
        });
    }
};

// Middleware para verificar se o usuário pode acessar suas próprias tarefas
exports.verificarProprietarioTarefa = (req, res, next) => {
    if (req.session && req.session.usuarioLogado) {
        const usuarioId = req.session.usuarioLogado.id;
        const role = req.session.usuarioLogado.role;
        
        // Se for admin, pode acessar qualquer tarefa
        if (role === 'admin') {
            return next();
        }
        
        // Para usuários comuns, adiciona filtro por usuário nas tarefas
        // Isso será usado nos controllers para filtrar apenas as tarefas do usuário
        req.usuarioLogado = {
            id: usuarioId,
            role: role
        };
        
        return next();
    } else {
        // Usuário não está autenticado
        return res.status(401).json({ 
            message: "Acesso negado. Você precisa estar logado para acessar este recurso." 
        });
    }
};

// Middleware para adicionar informações do usuário logado ao request
exports.adicionarUsuarioLogado = (req, res, next) => {
    if (req.session && req.session.usuarioLogado) {
        req.usuarioLogado = req.session.usuarioLogado;
    }
    next();
};
