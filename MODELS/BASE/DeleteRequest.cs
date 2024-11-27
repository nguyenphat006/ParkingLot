using FluentValidation;

namespace MODELS
{
    public class DeleteRequest
    {
        public Guid Id { get; set; }
    }

    public class DeleteRequestValidator : AbstractValidator<DeleteRequest>
    {
        public DeleteRequestValidator()
        {
            RuleFor(r => r.Id).NotNull().WithMessage("Mã không được rỗng");
        }
    }
}
